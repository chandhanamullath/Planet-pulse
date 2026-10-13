// PlanetPulse Agricultural Telemetry & Daily Food Inflation Impact Engine
// Powered by Open-Meteo Soil & Evapotranspiration Models

const agroCache = new Map();
const CACHE_TTL_MS = 60 * 1000;

export async function fetchAgroInflationData(lat, lng) {
  const roundedLat = Number(lat).toFixed(4);
  const roundedLng = Number(lng).toFixed(4);
  const cacheKey = `agro_${roundedLat}_${roundedLng}`;

  if (agroCache.has(cacheKey)) {
    const item = agroCache.get(cacheKey);
    if (Date.now() - item.timestamp < CACHE_TTL_MS) {
      return item.data;
    }
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${roundedLat}&longitude=${roundedLng}&hourly=soil_temperature_0cm,soil_moisture_0_to_1cm,et0_fao_evapotranspiration&forecast_days=1&timezone=auto`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Agricultural API returned status ${res.status}`);
    }

    const json = await res.json();
    const hourly = json.hourly || {};

    // Get current/latest hourly reading
    const moistureArr = hourly.soil_moisture_0_to_1cm || [];
    const tempArr = hourly.soil_temperature_0cm || [];
    const etArr = hourly.et0_fao_evapotranspiration || [];

    const now = new Date();
    const currentHour = now.getHours();

    const soilMoisture = moistureArr[currentHour] ?? moistureArr[0] ?? 0.28;
    const soilTemp = tempArr[currentHour] ?? tempArr[0] ?? 18.0;
    
    // Sum daily reference evapotranspiration
    const dailyET = etArr.slice(0, 24).reduce((sum, v) => sum + (v || 0), 0);

    // Compute Soil Moisture Status
    let moistureStatus = {
      label: 'Optimal Soil Moisture',
      rating: 'Healthy',
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.15)',
      desc: 'Soil volumetric water content is ideal for vegetative growth and grain filling.'
    };

    if (soilMoisture < 0.14) {
      moistureStatus = {
        label: 'Severe Agricultural Drought',
        rating: 'Drought Shock',
        color: '#e11d48',
        bg: 'rgba(225, 29, 72, 0.15)',
        desc: 'Critical root zone deficit. Crops under heat and desiccation stress.'
      };
    } else if (soilMoisture < 0.22) {
      moistureStatus = {
        label: 'Moderate Water Deficit',
        rating: 'Dry Soil',
        color: '#f59e0b',
        bg: 'rgba(245, 158, 11, 0.15)',
        desc: 'Soil moisture below optimal threshold. Irrigation required to avoid yield drops.'
      };
    } else if (soilMoisture > 0.42) {
      moistureStatus = {
        label: 'Saturated / Waterlogged',
        rating: 'Excess Moisture',
        color: '#06b6d4',
        bg: 'rgba(6, 182, 212, 0.15)',
        desc: 'Excess precipitation may cause root hypoxia or delay planting/harvesting.'
      };
    }

    // Daily Essential Commodities Inflation Risk Modeling
    // 1. Bread, Flour & Pasta (Wheat & Cereal Grains)
    let breadRisk = {
      product: 'Bread, Flour & Pasta',
      staple: 'Wheat & Grains',
      icon: 'Wheat',
      riskScore: 12,
      riskLevel: 'Stable / Low',
      riskColor: '#10b981',
      projectedImpact: '+0.5% to +1.2%',
      cause: 'Moisture levels support regular harvest yields.'
    };

    if (soilMoisture < 0.15 || soilTemp > 34) {
      breadRisk.riskScore = 84;
      breadRisk.riskLevel = 'High Inflation Pressure';
      breadRisk.riskColor = '#e11d48';
      breadRisk.projectedImpact = '+8.5% to +14.0%';
      breadRisk.cause = 'Severe soil drought threatens wheat bushel yield and grain density.';
    } else if (soilMoisture < 0.22) {
      breadRisk.riskScore = 48;
      breadRisk.riskLevel = 'Moderate Pressure';
      breadRisk.riskColor = '#f59e0b';
      breadRisk.projectedImpact = '+3.0% to +5.5%';
      breadRisk.cause = 'Sub-optimal moisture may reduce late-season harvest tonnage.';
    }

    // 2. Morning Coffee & Chocolate (Coffee Beans & Cocoa)
    let coffeeRisk = {
      product: 'Morning Coffee & Cocoa',
      staple: 'Coffee & Cocoa Beans',
      icon: 'Coffee',
      riskScore: 20,
      riskLevel: 'Stable',
      riskColor: '#10b981',
      projectedImpact: '+1.0% to +2.0%',
      cause: 'Equatorial climate conditions within expected seasonal ranges.'
    };

    if (soilMoisture < 0.18 || dailyET > 4.5) {
      coffeeRisk.riskScore = 78;
      coffeeRisk.riskLevel = 'High Price Spike Alert';
      coffeeRisk.riskColor = '#e11d48';
      coffeeRisk.projectedImpact = '+9.0% to +16.5%';
      coffeeRisk.cause = 'High evapotranspiration desiccates coffee blossoms and cocoa pods.';
    } else if (soilMoisture < 0.24) {
      coffeeRisk.riskScore = 52;
      coffeeRisk.riskLevel = 'Elevated Risk';
      coffeeRisk.riskColor = '#f59e0b';
      coffeeRisk.projectedImpact = '+4.0% to +7.0%';
      coffeeRisk.cause = 'Dry root zone increases bean defect rate and spot market volatility.';
    }

    // 3. Cooking Oils & Meat (Soybean & Corn animal feed)
    let oilRisk = {
      product: 'Cooking Oil & Meat',
      staple: 'Soybean & Corn Feed',
      icon: 'Droplet',
      riskScore: 18,
      riskLevel: 'Stable / Low',
      riskColor: '#10b981',
      projectedImpact: '+0.8% to +1.5%',
      cause: 'Stable soil temperature ensures steady livestock feed and oilseed crushing.'
    };

    if (soilMoisture < 0.16) {
      oilRisk.riskScore = 72;
      oilRisk.riskLevel = 'Elevated Inflation';
      oilRisk.riskColor = '#e11d48';
      oilRisk.projectedImpact = '+6.5% to +11.0%';
      oilRisk.cause = 'Feed crop stress translates directly to higher meat and poultry production costs.';
    } else if (soilMoisture < 0.23) {
      oilRisk.riskScore = 44;
      oilRisk.riskLevel = 'Moderate Risk';
      oilRisk.riskColor = '#f59e0b';
      oilRisk.projectedImpact = '+2.5% to +4.5%';
      oilRisk.cause = 'Lower seed oil content expected from moisture-constrained crops.';
    }

    // 4. Fresh Produce & Vegetables
    let produceRisk = {
      product: 'Fresh Vegetables & Fruits',
      staple: 'Horticulture Crops',
      icon: 'Apple',
      riskScore: 15,
      riskLevel: 'Low Risk',
      riskColor: '#10b981',
      projectedImpact: '+1.0% to +2.5%',
      cause: 'Soil temperatures allow normal greenhouse and field harvesting cycles.'
    };

    if (soilTemp > 35 || soilTemp < 3) {
      produceRisk.riskScore = 80;
      produceRisk.riskLevel = 'Thermal Stress Alert';
      produceRisk.riskColor = '#e11d48';
      produceRisk.projectedImpact = '+10.0% to +18.0%';
      produceRisk.cause = 'Thermal extremes (heat scorch or near-frost) disrupt fresh vegetable supply chains.';
    }

    // Composite Grocery Basket Inflation Pressure Index (0 - 100)
    const compositeInflationScore = Math.round(
      (breadRisk.riskScore * 0.35) + 
      (coffeeRisk.riskScore * 0.25) + 
      (oilRisk.riskScore * 0.25) + 
      (produceRisk.riskScore * 0.15)
    );

    const result = {
      soilMoisture: Number(soilMoisture.toFixed(3)),
      soilTemperatureC: Number(soilTemp.toFixed(1)),
      dailyEvapotranspirationMm: Number(dailyET.toFixed(1)),
      moistureStatus,
      compositeInflationScore,
      commodities: [breadRisk, coffeeRisk, oilRisk, produceRisk],
      timestamp: new Date().toISOString(),
      source: 'Open-Meteo European Agricultural & Soil Chemistry Models',
      attributionUrl: 'https://open-meteo.com/'
    };

    agroCache.set(cacheKey, { timestamp: Date.now(), data: result });
    return result;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}
