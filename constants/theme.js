import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");

export const COLORS = {
    //base colors
    white: '#FFFFFF',
    white2: '#F5F5F5',
    blue1: '#0066B3',
    blue2: '#0095D6',
    orange: '#F78B1F',
    green: '#00AC54',
    brown: '#BA8860',
    red: '#D81920',
    purple: '#993F98',
    yellow: '#FFCB05',
    gray1: '#77787B',
    gray2: '#6D6E71',
    gray3: '#E9E9EA',
    red: '#FF0000',
    red2: '#C94848',
};

export const SIZES = {
    //global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 23,

    //font sizes
    h0: 50,
    h1: 36,
    h2: 24,
    h3: 18,
    h4: 14,
    h5: 12,
    
    body0: 50,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    //app dimensions
    width,
    height,
};

export const FONTS = {
    h0: { fontFamily: "Roboto-Bold", fontSize: SIZES.h0, lineHeight:60 },
    h1: { fontFamily: "Roboto-Bold", fontSize: SIZES.h1, lineHeight:50 },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight:30 },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight:24 },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight:20 },
    h5: { fontFamily: "Roboto-Bold", fontSize: SIZES.h5, lineHeight:16 },
    body0: { fontFamily: "Roboto-Regular", fontSize: SIZES.body0, lineHeight: 60 },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 16 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;