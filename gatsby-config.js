module.exports = {
  siteMetadata: {
    title: 'THE IMMORTALS ARE QUITE BUSY THESE DAYS',
    description: 'NAWIN NUTHONG - THE IMMORTALS ARE QUITE BUSY THESE DAYS - 30.01 - 21.03.2021'
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `THE_IMMORTALS_ARE_QUITE_BUSY_THESE_DAYS`,
        short_name: `BusyImmortal`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/images/favicon.jpeg`,
      },
    },
  ],
}
