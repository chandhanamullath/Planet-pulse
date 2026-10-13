// WMO Weather Interpretation Codes (WW)
export function getWeatherDetails(code) {
  const weatherMap = {
    0: { label: 'Clear Sky', icon: 'Sun', desc: 'Sunny and completely clear conditions' },
    1: { label: 'Mainly Clear', icon: 'SunDim', desc: 'Passing light cloud cover' },
    2: { label: 'Partly Cloudy', icon: 'CloudSun', desc: 'Scattered clouds and mild sun' },
    3: { label: 'Overcast', icon: 'Cloud', desc: 'Dense overcast sky cover' },
    45: { label: 'Foggy', icon: 'CloudFog', desc: 'Reduced visibility due to fog' },
    48: { label: 'Depositing Rime Fog', icon: 'CloudFog', desc: 'Freezing rime fog conditions' },
    51: { label: 'Light Drizzle', icon: 'CloudDrizzle', desc: 'Gentle light mist precipitation' },
    53: { label: 'Moderate Drizzle', icon: 'CloudDrizzle', desc: 'Steady light drizzle droplets' },
    55: { label: 'Dense Drizzle', icon: 'CloudDrizzle', desc: 'Heavy mist and drizzle' },
    56: { label: 'Freezing Drizzle', icon: 'CloudSnow', desc: 'Sub-zero freezing drizzle' },
    57: { label: 'Heavy Freezing Drizzle', icon: 'CloudSnow', desc: 'Severe freezing drizzle icing' },
    61: { label: 'Slight Rain', icon: 'CloudRain', desc: 'Light rainfall showers' },
    63: { label: 'Moderate Rain', icon: 'CloudRain', desc: 'Consistent moderate rainfall' },
    65: { label: 'Heavy Rain', icon: 'CloudRainWind', desc: 'Intense heavy rainfall deluge' },
    66: { label: 'Freezing Rain', icon: 'CloudSnow', desc: 'Rain freezing upon contact' },
    67: { label: 'Heavy Freezing Rain', icon: 'CloudSnow', desc: 'Dangerous icy road conditions' },
    71: { label: 'Slight Snowfall', icon: 'Snowflake', desc: 'Light gentle snow flurries' },
    73: { label: 'Moderate Snowfall', icon: 'Snowflake', desc: 'Steadily accumulating snow' },
    75: { label: 'Heavy Snowfall', icon: 'Snowflake', desc: 'Blizzard-like heavy snowfall' },
    77: { label: 'Snow Grains', icon: 'Snowflake', desc: 'Fine frozen snow pellets' },
    80: { label: 'Slight Rain Showers', icon: 'CloudRain', desc: 'Intermittent scattered rain' },
    81: { label: 'Moderate Rain Showers', icon: 'CloudRain', desc: 'Brisk rain showers' },
    82: { label: 'Violent Rain Showers', icon: 'CloudLightning', desc: 'Torrential downpours' },
    85: { label: 'Slight Snow Showers', icon: 'Snowflake', desc: 'Passing snow flurries' },
    86: { label: 'Heavy Snow Showers', icon: 'Snowflake', desc: 'Frequent intense squalls' },
    95: { label: 'Thunderstorm', icon: 'CloudLightning', desc: 'Thunder and lightning activity' },
    96: { label: 'Thunderstorm with Hail', icon: 'CloudLightning', desc: 'Thunderstorm with small hail' },
    99: { label: 'Severe Thunderstorm', icon: 'Zap', desc: 'Violent storm with large hail' }
  };

  return weatherMap[code] || { label: 'Atmospheric Conditions', icon: 'Cloud', desc: 'Variable weather' };
}

// AQI EPA Category Helper
export function getAQICategory(aqi) {
  if (aqi === null || aqi === undefined) {
    return {
      label: 'Unknown',
      color: '#94a3b8',
      bg: 'rgba(148, 163, 184, 0.15)',
      description: 'Data unavailable',
      advice: 'No air quality data currently recorded.'
    };
  }

  if (aqi <= 50) {
    return {
      label: 'Good',
      color: '#10b981', // emerald green
      bg: 'rgba(16, 185, 129, 0.15)',
      description: 'Air quality is satisfactory and poses little or no risk.',
      advice: 'Ideal conditions for outdoor exercise and activities.'
    };
  } else if (aqi <= 100) {
    return {
      label: 'Moderate',
      color: '#06b6d4', // cyan
      bg: 'rgba(6, 182, 212, 0.15)',
      description: 'Air quality is acceptable. Very sensitive individuals may experience minor symptoms.',
      advice: 'Unusually sensitive people should consider reducing prolonged outdoor exertion.'
    };
  } else if (aqi <= 150) {
    return {
      label: 'Unhealthy for Sensitive Groups',
      color: '#f59e0b', // amber
      bg: 'rgba(245, 158, 11, 0.15)',
      description: 'Members of sensitive groups may experience health effects.',
      advice: 'Children, older adults, and individuals with respiratory issues should limit time outside.'
    };
  } else if (aqi <= 200) {
    return {
      label: 'Unhealthy',
      color: '#ef4444', // red
      bg: 'rgba(239, 68, 68, 0.15)',
      description: 'Everyone may begin to experience health effects.',
      advice: 'Avoid prolonged outdoor exertion. Sensitive groups should stay indoors.'
    };
  } else if (aqi <= 300) {
    return {
      label: 'Very Unhealthy',
      color: '#a855f7', // purple
      bg: 'rgba(168, 85, 247, 0.15)',
      description: 'Health alert: risk of health effects increased for everyone.',
      advice: 'Wear protective masks outdoors and keep windows closed with air filtration.'
    };
  } else {
    return {
      label: 'Hazardous',
      color: '#e11d48', // rose/maroon
      bg: 'rgba(225, 29, 72, 0.2)',
      description: 'Health warnings of emergency conditions. Entire population is affected.',
      advice: 'Remain indoors with air purifiers active. Avoid any outdoor physical activity.'
    };
  }
}
