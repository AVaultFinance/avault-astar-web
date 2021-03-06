import { createGlobalStyle } from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@my/ui/dist/theme';
declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}
export const BgGlobalStyle = createGlobalStyle`

body {
  background-image: url('/images/stake/stake_bg_small.svg');
  background-size: 100%;
  background-position: center top;
  background-repeat: no-repeat;
  margin-bottom: -40px;
  @media screen and (max-width: 852px){
    div.inner{
      border-bottom: none!important;
    }
    .inner > .right{
      background-color: transparent!important;
    }
    .content{
      margin-bottom: 62px;
      min-height: 83vh;
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
    background-image: url('/images/stake/stake_bg.svg');
    background-position: center bottom;
  }
  &:before{
    content:"";
    width: 420px;
    height: 150px;
    background-image: url('/images/stake/bg_element.svg');
    background-size: 100%;
    position: absolute;
    background-repeat: no-repeat;
  }
  &:before{
    top: 80px;
    right: 40%;
    ${({ theme }) => theme.mediaQueries.md} {
      top: 160px;
      right: 50%;
    }
  }
}
#root{
  position: relative;
  z-index: 3;
}
`;
const GlobalStyle = createGlobalStyle`
@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translate(0, 54px);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}
@keyframes slide-left {
  0% {
    opacity: 0;
    transform: translate(-54px, 0);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}
@keyframes slide-right {
  0% {
    opacity: 0;
    transform: translate(54px, 0);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 100;
  src: url('/fonts/poppins/poppins-v5-latin-100.eot'); /* IE9 Compat Modes */
  src: local('Poppins Thin'), local('Poppins-Thin'),
    url('/fonts/poppins/poppins-v5-latin-100.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/poppins/poppins-v5-latin-100.woff2') format('woff2'),
    /* Super Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-100.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-100.ttf') format('truetype'),
    /* Safari, Android, iOS */ url('/fonts/poppins/poppins-v5-latin-100.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-200 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 200;
  src: url('/fonts/poppins/poppins-v5-latin-200.eot'); /* IE9 Compat Modes */
  src: local('Poppins ExtraLight'), local('Poppins-ExtraLight'),
    url('/fonts/poppins/poppins-v5-latin-200.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/poppins/poppins-v5-latin-200.woff2') format('woff2'),
    /* Super Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-200.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-200.ttf') format('truetype'),
    /* Safari, Android, iOS */ url('/fonts/poppins/poppins-v5-latin-200.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-200italic - latin */
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 200;
  src: url('/fonts/poppins/poppins-v5-latin-200italic.eot'); /* IE9 Compat Modes */
  src: local('Poppins ExtraLight Italic'), local('Poppins-ExtraLightItalic'),
    url('/fonts/poppins/poppins-v5-latin-200italic.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/poppins/poppins-v5-latin-200italic.woff2') format('woff2'),
    /* Super Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-200italic.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-200italic.ttf') format('truetype'),
    /* Safari, Android, iOS */ url('/fonts/poppins/poppins-v5-latin-200italic.svg#Poppins') format('svg'); /* Legacy iOS */
}
&::-webkit-scrollbar {
  display: none;
}
/* poppins-100italic - latin */
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 100;
  src: url('/fonts/poppins/poppins-v5-latin-100italic.eot'); /* IE9 Compat Modes */
  src: local('Poppins Thin Italic'), local('Poppins-ThinItalic'),
    url('/fonts/poppins/poppins-v5-latin-100italic.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/poppins/poppins-v5-latin-100italic.woff2') format('woff2'),
    /* Super Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-100italic.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-100italic.ttf') format('truetype'),
    /* Safari, Android, iOS */ url('/fonts/poppins/poppins-v5-latin-100italic.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-300 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  src: url('/fonts/poppins/poppins-v5-latin-300.eot'); /* IE9 Compat Modes */
  src: local('Poppins Light'), local('Poppins-Light'),
    url('/fonts/poppins/poppins-v5-latin-300.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/poppins/poppins-v5-latin-300.woff2') format('woff2'),
    /* Super Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-300.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-300.ttf') format('truetype'),
    /* Safari, Android, iOS */ url('/fonts/poppins/poppins-v5-latin-300.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-300italic - latin */
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 300;
  src: url('/fonts/poppins/poppins-v5-latin-300italic.eot'); /* IE9 Compat Modes */
  src: local('Poppins Light Italic'), local('Poppins-LightItalic'),
    url('/fonts/poppins/poppins-v5-latin-300italic.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/poppins/poppins-v5-latin-300italic.woff2') format('woff2'),
    /* Super Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-300italic.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-300italic.ttf') format('truetype'),
    /* Safari, Android, iOS */ url('/fonts/poppins/poppins-v5-latin-300italic.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-regular - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  src: url('/fonts/poppins/poppins-v5-latin-regular.eot'); /* IE9 Compat Modes */
  src: local('Poppins Regular'), local('Poppins-Regular'),
    url('/fonts/poppins/poppins-v5-latin-regular.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/poppins/poppins-v5-latin-regular.woff2') format('woff2'),
    /* Super Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-regular.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-regular.ttf') format('truetype'),
    /* Safari, Android, iOS */ url('/fonts/poppins/poppins-v5-latin-regular.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-italic - latin */
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 400;
  src: url('/fonts/poppins/poppins-v5-latin-italic.eot'); /* IE9 Compat Modes */
  src: local('Poppins Italic'), local('Poppins-Italic'),
    url('/fonts/poppins/poppins-v5-latin-italic.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/poppins/poppins-v5-latin-italic.woff2') format('woff2'),
    /* Super Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-italic.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-italic.ttf') format('truetype'),
    /* Safari, Android, iOS */ url('/fonts/poppins/poppins-v5-latin-italic.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-500 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  src: url('/fonts/poppins/poppins-v5-latin-500.eot'); /* IE9 Compat Modes */
  src: local('Poppins Medium'), local('Poppins-Medium'),
    url('/fonts/poppins/poppins-v5-latin-500.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/poppins/poppins-v5-latin-500.woff2') format('woff2'),
    /* Super Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-500.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-500.ttf') format('truetype'),
    /* Safari, Android, iOS */ url('/fonts/poppins/poppins-v5-latin-500.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-500italic - latin */
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 500;
  src: url('/fonts/poppins/poppins-v5-latin-500italic.eot'); /* IE9 Compat Modes */
  src: local('Poppins Medium Italic'), local('Poppins-MediumItalic'),
    url('/fonts/poppins/poppins-v5-latin-500italic.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/poppins/poppins-v5-latin-500italic.woff2') format('woff2'),
    /* Super Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-500italic.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-500italic.ttf') format('truetype'),
    /* Safari, Android, iOS */ url('/fonts/poppins/poppins-v5-latin-500italic.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-600 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  src: url('/fonts/poppins/poppins-v5-latin-600.eot'); /* IE9 Compat Modes */
  src: local('Poppins SemiBold'), local('Poppins-SemiBold'),
    url('/fonts/poppins/poppins-v5-latin-600.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/poppins/poppins-v5-latin-600.woff2') format('woff2'),
    /* Super Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-600.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-600.ttf') format('truetype'),
    /* Safari, Android, iOS */ url('/fonts/poppins/poppins-v5-latin-600.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-600italic - latin */
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 600;
  src: url('/fonts/poppins/poppins-v5-latin-600italic.eot'); /* IE9 Compat Modes */
  src: local('Poppins SemiBold Italic'), local('Poppins-SemiBoldItalic'),
    url('/fonts/poppins/poppins-v5-latin-600italic.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/poppins/poppins-v5-latin-600italic.woff2') format('woff2'),
    /* Super Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-600italic.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-600italic.ttf') format('truetype'),
    /* Safari, Android, iOS */ url('/fonts/poppins/poppins-v5-latin-600italic.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-700 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  src: url('/fonts/poppins/poppins-v5-latin-700.eot'); /* IE9 Compat Modes */
  src: local('Poppins Bold'), local('Poppins-Bold'),
    url('/fonts/poppins/poppins-v5-latin-700.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/poppins/poppins-v5-latin-700.woff2') format('woff2'),
    /* Super Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-700.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-700.ttf') format('truetype'),
    /* Safari, Android, iOS */ url('/fonts/poppins/poppins-v5-latin-700.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-700italic - latin */
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 700;
  src: url('/fonts/poppins/poppins-v5-latin-700italic.eot'); /* IE9 Compat Modes */
  src: local('Poppins Bold Italic'), local('Poppins-BoldItalic'),
    url('/fonts/poppins/poppins-v5-latin-700italic.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/poppins/poppins-v5-latin-700italic.woff2') format('woff2'),
    /* Super Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-700italic.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-700italic.ttf') format('truetype'),
    /* Safari, Android, iOS */ url('/fonts/poppins/poppins-v5-latin-700italic.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-800 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 800;
  src: url('/fonts/poppins/poppins-v5-latin-800.eot'); /* IE9 Compat Modes */
  src: local('Poppins ExtraBold'), local('Poppins-ExtraBold'),
    url('/fonts/poppins/poppins-v5-latin-800.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/poppins/poppins-v5-latin-800.woff2') format('woff2'),
    /* Super Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-800.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-800.ttf') format('truetype'),
    /* Safari, Android, iOS */ url('/fonts/poppins/poppins-v5-latin-800.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-800italic - latin */
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 800;
  src: url('/fonts/poppins/poppins-v5-latin-800italic.eot'); /* IE9 Compat Modes */
  src: local('Poppins ExtraBold Italic'), local('Poppins-ExtraBoldItalic'),
    url('/fonts/poppins/poppins-v5-latin-800italic.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/poppins/poppins-v5-latin-800italic.woff2') format('woff2'),
    /* Super Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-800italic.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-800italic.ttf') format('truetype'),
    /* Safari, Android, iOS */ url('/fonts/poppins/poppins-v5-latin-800italic.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-900 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 900;
  src: url('/fonts/poppins/poppins-v5-latin-900.eot'); /* IE9 Compat Modes */
  src: local('Poppins Black'), local('Poppins-Black'),
    url('/fonts/poppins/poppins-v5-latin-900.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/poppins/poppins-v5-latin-900.woff2') format('woff2'),
    /* Super Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-900.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-900.ttf') format('truetype'),
    /* Safari, Android, iOS */ url('/fonts/poppins/poppins-v5-latin-900.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-900italic - latin */
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 900;
  src: url('/fonts/poppins/poppins-v5-latin-900italic.eot'); /* IE9 Compat Modes */
  src: local('Poppins Black Italic'), local('Poppins-BlackItalic'),
    url('/fonts/poppins/poppins-v5-latin-900italic.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/poppins/poppins-v5-latin-900italic.woff2') format('woff2'),
    /* Super Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-900italic.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/poppins/poppins-v5-latin-900italic.ttf') format('truetype'),
    /* Safari, Android, iOS */ url('/fonts/poppins/poppins-v5-latin-900italic.svg#Poppins') format('svg'); /* Legacy iOS */
}

  * {
    font-family: 'Poppins', sans-serif;
  }
  html {
    height: 100%;
  }
  ul,li{
    list-style: none;
  }
  body {
    height: 100%;
    background-color: ${({ theme }) => theme.colors.background02};
    padding: 0;
    color: #fff;
    ${({ theme }) => theme.mediaQueries.md} {
      padding: 0 20px;
    }
    img {
      height: auto;
      max-width: 100%;
    }
    #root {
      min-height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  .w20{
    width: 20px;
  }



.back-top {
  position: fixed;
  bottom: 64px;
  right: 30px;
  width: 30px;
  height: 30px;

}
.back-top-icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAM1BMVEUAAADx8fEAAADo6OgAAAAAAADNzc39/f37+/vd3d21tbWYmJhERET39/fq6upxcXH///+E7V3/AAAAEHRSTlMmwACoGQ958+aRX0wx160938kFbQAAAPJJREFUWMPt2UuugzAQRNECbPM3vf/VvpdE+ZBWIitVwz4LKIF0mTTor3ICKeXbEq5zkMj3wQSRdBl0e+Qi3PtS8v8gpHpkSGUkSCWET9Z9hdIy2rhAp9hFgcpsNzM0qt1VCGydPXUbWMdur/aDzWWys2llc3k3LmQuXiFz8WYyF6+SuXjdxuXi7Qebi7l8yFy4fIq1KEQuXD7VWlU6F58Pm4vPh83F58Pm4vMhc/FKey5kPoP9amjLhcynDGeTfTMNZw2fYff9kfAmBmMwBmMwBmMwBmMwBl8Hw0MSz+lPpj2k5Gdn9WFcf7rX/1yQ//74A251bnrBUaCPAAAAAElFTkSuQmCC) no-repeat;
      background-size: 100% 100%;
  }

  .back-top.hidden {
      display: none;
  }
`;

export default GlobalStyle;
