//----------------------------------------------------------
import { ref } from 'vue';
//----------------------------------------------------------
const settings = {
  fontsUrl: 'https://fonts.googleapis.com/css',
  apiKey: null,
  apiUrl: () => {
    if(settings.apiKey === null) {
      throw new Error('Google Fonts API key is not set. Please set it using setApiKey() function.');
    }
    return `https://www.googleapis.com/webfonts/v1/webfonts?key=${ settings.apiKey }`;
  }
}
//----------------------------------------------------------
export function useGoogleFonts() {

  const categories = [
    "serif",
    "sans-serif",
    "monospace",
    "display",
    "handwriting"
  ];

  const selectedFonts = ref([]);

  return {
    categories,
    selectedFonts,
    setApiKey,
    getGoogleFontsList,
    getGoogleFontCss,
    setGoogleFontsHeaderTags
  }
}

//----------------------------------------------------------
//----------------------------------------------------------
function setApiKey(key) {
  settings.apiKey = key;
}
//----------------------------------------------------------
async function getGoogleFontsData(googleFontsApiUrl) {
  const res = await fetch(settings.apiUrl()).then(r => r.json());
  return res.items;
}
//----------------------------------------------------------
async function getGoogleFontsList(masterList, category) {
  if(!masterList || masterList.length===0) {
    masterList = await getGoogleFontsData();
  }
  if(category) {      
    return masterList.filter(l => l.category===category);
  }
  return masterList;
}
//----------------------------------------------------------
async function getGoogleFontCss(fontsList) {
  let cssUrl = settings.fontsUrl;
  cssUrl += fontsList.map(f => f.replaceAll(' ', '+')).join("&family=");    
  cssUrl += '&display=swap';  
  return cssUrl;
}
//----------------------------------------------------------
async function setGoogleFontsHeaderTags(fontsList) {
  let preconnect1 = document.head.querySelector(`link[rel="preconnect"][href="${settings.fontsUrl}"]`);
  if(!preconnect1) {
    preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = settings.fontsUrl;
    document.head.appendChild(preconnect1);
  }
  
  let preconnect2 = document.head.querySelector('link[rel="preconnect"][href="https://fonts.gstatic.com"]');
  if(!preconnect2) {
    preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.setAttribute('crossorigin', 'crossorigin');
    document.head.appendChild(preconnect2);
  }

  createFontLinks(fontsList);
  createStyleLinks(fontsList);
  
}
//----------------------------------------------------------
function createFontLinks(fontsList) {
  const families = [...new Set(fontsList)]
    .map(f => `family=${f.replaceAll(' ', '+')}`)
    .join('&');

  const href = `${settings.fontsUrl}?${families}&display=swap`;
  let fontsLink = document.head.querySelector(`link[rel="stylesheet"][href="${href}"]`);

  if(!fontsLink) {
    fontsLink = document.createElement('link');
    fontsLink.rel = 'stylesheet';
    fontsLink.href = href;
    document.head.appendChild(fontsLink);
  }
}
//----------------------------------------------------------
function createStyleLinks(fontsList) {
  let styleElement = document.head.querySelector('style[data-google-fonts="classes"]');
  if(!styleElement) {
    styleElement = document.createElement('style');
    styleElement.setAttribute('data-google-fonts', 'classes');
    document.head.appendChild(styleElement);
  }
  styleElement.textContent = [...new Set(fontsList)].map(f => `
    .${f.toLowerCase().replaceAll(' ', '-')} {
      font-family: "${ f }";
    }
  `).join('');
}
//----------------------------------------------------------
function clearExistingFontLinks() {
  const existingFontLinks = document.head.querySelectorAll('link[rel="stylesheet"][href^="https://fonts.googleapis.com/css"]');
  existingFontLinks.forEach(link => link.remove());
  const existingStyleElements = document.head.querySelectorAll('style[data-google-fonts="classes"]');
  existingStyleElements.forEach(style => style.remove());
}
//----------------------------------------------------------