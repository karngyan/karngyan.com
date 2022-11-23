// Upload files in static/ So any file static/file.pdf -> /file.pdf is accessible at root

export default {
  name: "Madhav Kauntia",
  domain: "madhavkauntia.com", // add without https:// , used in meta tags and share urls
  image: "/images/madhav.jpeg",
  email: "mail@madhavkauntia.com",
  googleAnalyticsV4: {
    enabled: false,
    id: ""
  },
  plausibleAnalytics: {
    enabled: true,
    domain: "madhavkauntia.com",
    trackLocalhost: false,
    // leave it empty if plausible is not self hosted
    apiHost: "https://plausible.io" // default: https://plausible.io
  },
  // enable if you want comments and likes on posts
  // see how it looks on karngyan.com
  firebase: {
    enabled: true
  },
  social: {
    github: "madhavkauntia",
    linkedin: "madhavkauntia",
    facebook: "madhav.kauntia",
    twitter: "madhavkauntia",
    instagram: "madhavkauntia",
    codestats: "madhavkauntia" // https://codestats.net make a profile if you dont already have one.
  },
  buyMeACoffee: {
    enabled: true,
    url: "https://www.buymeacoffee.com/madhavkauntia"
  },
  projects: {
    enabled: true
  },
  blog: {
    enabled: true
  },
  resume: {
    enabled: true,
    pdfUrl: "/Madhav Kauntia.pdf" // add files in static folder
  },
  uses: {
    enabled: true,
    meta: [
      { title: "Laptop", value: "MacBook Pro M1 (14-inch, 2021)", link: "https://www.apple.com/in/shop/buy-mac/macbook-pro/14-inch-macbook-pro" },
      { title: "OS", value: "macOS Ventura", link: "https://www.apple.com/in/macos/ventura/" },
      { title: "Memory", value: "32 GB LPDDR5" },
      { title: "Mouse", value: "Logitech MX Master 3S", link: "https://www.amazon.in/Logitech-MX-Master-3S-Chrome-Graphite/dp/B0B11LJ69K/ref=sr_1_2?crid=1NHOVPXV7CN0J&keywords=mx%2Bmaster%2B3s&qid=1669211809&qu=eyJxc2MiOiIyLjM2IiwicXNhIjoiMS44NyIsInFzcCI6IjEuODUifQ%3D%3D&sprefix=mx%2Bmaster%2B3%2Caps%2C261&sr=8-2&th=1" },
      { title: "E-Reader", value: "Kindle (10th Gen)", link: "https://www.amazon.in/Kindle-10th-Gen/dp/B07FQ4Q7MB" },
      { title: "Phone", value: "OnePlus Nord 2", link: "https://www.amazon.in/gp/product/B097RDF6NW/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1" },
      { title: "Earphones", value: "OnePlus Buds Z", link: "https://www.flipkart.com/oneplus-buds-z-bluetooth-headset/p/itm19b979ac03b7a?pid=ACCFVA3GNUZQZEHZ&lid=LSTACCFVA3GNUZQZEHZNZJSET" },
      { title: "Headphones", value: "JBL T460BT by Harman", link: "https://www.amazon.in/gp/product/B077T4737M/ref=ppx_yo_dt_b_search_asin_image?ie=UTF8&psc=1" },
      { title: "Desk", value: "Wakefit Athena Engineered Wood Study Table", link: "https://www.amazon.in/Wakefit-Athena-Study-Table-Columbian/dp/B08QGXGWT3/ref=sr_1_3?keywords=wakefit+athena&qid=1669212813&qu=eyJxc2MiOiIxLjUxIiwicXNhIjoiMC4wMCIsInFzcCI6IjAuMDAifQ%3D%3D&sr=8-3" },
      { title: "Chair", value: "Mika Leatherette Study Chair (White)", link: "https://www.urbanladder.com/products/mika-study-chair" },
      { title: "Fitness Band", value: "MI Smart Band 5", link: "https://www.amazon.in/Smart-AMOLED-Display-Battery-Resistant/dp/B08GXC2NTX/ref=sr_1_1?crid=37AKNHVE2SBAS&keywords=mi+band+5&qid=1669212871&qu=eyJxc2MiOiIzLjI3IiwicXNhIjoiMS44MyIsInFzcCI6IjEuMzAifQ%3D%3D&sprefix=mi+band+%2Caps%2C222&sr=8-1" }
    ]
  },
  workedAt: {
    // add logos in static and at max add 3/4
    enabled: true,
    meta: [
      {
        name: "Headout",
        src: "/images/headout.svg",
        url: "https://headout.com"
      },
      {
        name: "Walmart",
        src: "/images/walmart.png",
        url: "https://walmart.com"
      },
      { name: "PwC India", src: "/images/pwc.png", url: "https://pwc.in" }
    ]
  },
  recommendations: {
    enabled: false,
    meta: [
      {
        name: "Varun Jain",
        designation: "Founder, SendX & SendPost",
        image: "/images/varun.jpeg",
        linkedin: "https://www.linkedin.com/in/varun-jain-582b0215/",
        content:
          "Gyan interned with SendX and SendPost for around 6 months. He is a very strong full-stack engineer who can create pixel perfect frontend while being able to work on backend pieces sending millions of emails per day. He is a quick learner, a great team player and, has a very strong work ethic. You can rely on him that things will be done with utmost quality. He also has pretty good product instincts and can think from the user's perspective."
      },
      {
        name: "Gaurav Sen",
        designation: "Founder, InterviewReady",
        image: "/images/gaurav.jpeg",
        linkedin: "https://www.linkedin.com/in/gkcs/",
        content:
          "Karn is an extraordinarily talented, diligent and foresighted individual. He is gifted at building products from paper to code, and has a knack of finding efficient solutions to complex problems. In my experience, I have rarely seen such a mixture of talent and passion put together. At InterviewReady, Karn exceeded our expectations. If you are considering working with him: congratulations, you are going to have a great time!"
      }
    ]
  },
  loadingIndicator: {
    name: "pulse"
    // https://tobiasahlin.com/spinkit/
    // circle
    // cube-grid
    // fading-circle
    // folding-cube
    // chasing-dots
    // nuxt
    // pulse
    // rectangle-bounce
    // rotating-plane
    // three-bounce
    // wandering-cubes
  },
  strings: {
    en_US: {
      download: "download",
      nav: {
        home: "Home",
        blog: "Blog",
        projects: "Projects",
        uses: "Uses",
        resume: "Resume",
        buyMeACoffee: "Buy me a beer",
        signIn: "sign in",
        signOut: "sign out"
      },
      hero: {
        iBlogTech: "I blog",
        haveALook: "Have a look",
        friendlyNeighborhood: "Madhav Kauntia",
        description:
          "I am a full stack web developer who likes to learn new technologies by working on side projects. I also blog things I learn along the way.",
        words: ["developer", "engineer", "programmer"]
      },
      githubCalendar: {
        header: "contributions",
        subtext: "github calendar heatmap"
      },
      blog: {
        header: "blog",
        subtext:
          "I try to write once in a while. Let me know your thoughts at mkauntia@gmail.com."
      },
      recentBlog: {
        header: "recent blogs",
        subtext: ""
      },
      uses: {
        header: "uses",
        subtext:
          "The tools and services I use to get things done. Also, some codestats.net flex."
      },
      projects: {
        header: "projects",
        subtext: "This page lists some of my personal and work projects."
      },
      recommendations: {
        header: "recommendations",
        subtext: "what do my mentors say"
      }
    }
  }
};
