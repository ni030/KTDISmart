// tailwind.config.js

module.exports = {
  content: [
   "./App.{js,jsx,ts,tsx}",
   "./app/**/*.{js,jsx,ts,tsx}",  // Include all JS, JSX, TS, and TSX files in the app folder
   "./components/**/*.{js,jsx,ts,tsx}",  // Include all JS, JSX, TS, and TSX files in the components folder]
   "./app/(auth)/**/*.{js,jsx,ts,tsx}",  // Include all JS, JSX, TS, and TSX files in the auth folder
 ],
   theme: {
     extend: {
       fontFamily: {
          rootL: ['RootLight', 'sans-serif'],
          rootR: ['RootRegular', 'sans-serif'],
          rootM: ['RootMedium', 'sans-serif'],
          rootSB: ['RootSemiBold', 'sans-serif'],
          rootB: ['RootBold', 'sans-serif'],
       },
       colors: {
          "primary":{
            "100": "#BD708D",
            "200": "#B35B7D",
            "300": "#AA476D",
            "400": "#A1335D",
            "500": "#902D53",
            "600": "#702341",
            "700": "#601E27"
          }
       }
     },
   },
   plugins: [],
}