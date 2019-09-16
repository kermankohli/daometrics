module.exports = {
  theme: {
    fontFamily: {
      'display': ['Monsterrat'],
      'body': ['SFPro'],
    },
    fontSize: {
      'tiny': '0.5rem',
      'xs':   '0.75rem',
      'sm':   '0.875rem',
      'base': '1rem',
      'lg':   '1.125rem',
      'xl':   '1.25rem',
      '2xl':  '1.5rem',
      '3xl':  '1.875rem',
      '4xl':  '2.25rem',
      '5xl':  '3rem',
      '6xl':  '3.25rem',
      '7xl':  '3.50rem',
      '8xl':  '3.75rem',
      '9xl':  '4rem',
      '10xl': '4.25rem',
      '11xl': '4.50rem',
      '12xl': '4.75rem',
      '13xl': '5rem'
    },
    zIndex: {
      '-1': -1,
      '0':   0,
      '10': 10,
      '20': 20,
      '30': 30,
      '40': 40,
      '50': 50,
      'auto': 'auto'
    },
    borderRadius: {
      'none':     '0',
      'sm':       '.125rem',
      'default':  '.25rem',
      'lg':       '.5rem',
      'full':     '9999px',
      'xl':       '0.75rem'
    },
    screens: {
      mobile: '320px',
      tablet: '680px',
      desktop: '1200px'
    },
    colors: {
      green: {
        100: '#F7FFFC'
      },
      gray: {
        100: '#F6F6F6',
        200: '#F1EEEE',
        300: '#D8D8D8',
        400: '#BABABA',
        500: '#A0A0A0',
        600: '#787A7E',
        700: '#CBCBCB',
        800: '#828282',
        900: 'rgba(255, 255, 255, 0.70)',
        1000: '#FBFBFB'
      },
      blue: {
        100: '#0055FF',
        200: '#0B182D',
        300: '#A8B6BF'
      },
      purple: {
        100: 'rgba(255, 255, 255, 0.07)',
        200: '#3e326e'
      },
      white: '#FFFFFF',
      black: '#000000'
    },
    boxShadow: {
      'default':  '0px 4px 20px rgba(0, 0, 0, 0.05);',
      'md':       '0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)',
      'lg':       '0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)',
      'xl':       '0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04)',
      '2xl':      '0 25px 50px -12px rgba(0, 0, 0, .25)',
      'inner':    'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
      'outline':  '0 0 0 3px rgba(66,153,225,0.5)',
      'none':     'none'
    },
    spacing: {
      'none':'0px',
      'sm':  '0.25rem',
      'md':  '0.5rem',
      'lg':  '1rem',
      'xl':  '2rem',
      '2xl': '4rem',
      '3xl': '6rem',
      '4xl': '8rem',
      '1':   '0.25rem',
      '2':   '0.50rem',
      '3':   '0.75rem',
      '4':   '1.00rem',
      '5':   '1.25rem',
      '6':   '1.50rem',
      '7':   '1.75rem',
      '8':   '2.00rem',
      '10':  '2.50rem',
      '12':  '3.00rem',
      '16':  '4.00rem',
      '20':  '5.00rem',
      '24':  '6.00rem',
      '32':  '8.00rem',
      '40':  '10.00rem',
      '48':  '12.00rem',
      '56':  '14.00rem',
      '64':  '16.00rem',
      '80':  '20.00rem',
      '100': '25.00rem',
      '120': '30.00rem'
    },
    letterSpacing: {
      tightest: '-.075em',
      tighter:  '-.05em',
      tight:    '-.025em',
      normal:   '0',
      wide:     '.025em',
      wider:    '.05em',
      widest:   '.25em'
    },
    lineHeight: {
      none:     1,
      tight:    1.25,
      snug:     1.375,
      normal:   1.5,
      relaxed:  1.75,
      loose:    2,
    },
    gradients: {
      customGradient: [
        '#071021 0%', 
        '#101A24 39.58%', 
        '#1B0C29 64.06%', 
        '#000000 98.96%']
    },
    extend: {
      maxWidth: {
        mobile:  '320px',
        tablet:  '680px',
        desktop: '1200px'
      },
    },
  },
  variants: {
    maxWidth: ['responsive']
  },
  plugins: [
    require('tailwindcss-plugins/gradients')
  ]
}
