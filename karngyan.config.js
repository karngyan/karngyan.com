// Upload files in static/ So any file static/file.pdf -> /file.pdf is accessible at root

export default {
  name: "Madhav Kauntia",
  domain: "madhavkauntia.com", // add without https:// , used in meta tags and share urls
  image: "/images/madhav.jpeg",
  email: "mkauntia@gmail.com",
  googleAnalyticsV4: {
    enabled: false,
    id: ""
  },
  plausibleAnalytics: {
    enabled: false,
    domain: "template.karngyan.com",
    trackLocalhost: false,
    // leave it empty if plausible is not self hosted
    apiHost: "https://analytics.lookatx.dev" // default: https://plausible.io
  },
  // enable if you want comments and likes on posts
  // see how it looks on karngyan.com
  firebase: {
    enabled: false
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
    pdfUrl: "/Madhav Kauntia_BIT Mesra.pdf" // add files in static folder
  },
  uses: {
    enabled: true,
    meta: [
      { title: "Personal Laptop", value: "HP Omen 15 (2018)" },
      { title: "Work Laptop", value: "MacBook Pro (16-inch, 2019)" },
      { title: "OS", value: "Windows 11 with WSL 1" },
      { title: "Mouse", value: "Logitech Silent Pebble" },
      { title: "Keyboard", value: "Redgear Shadow Blade Mechanical Keyboard" },
      { title: "Monitor", value: "Dell U2415 UltraSharp 24inch" },
      { title: "E-Reader", value: "Kindle (10th Gen)" },
      { title: "Phone", value: "OnePlus Nord 2" },
      { title: "Earphones", value: "OnePlus Buds Z" },
      { title: "Desk", value: "Wakefit Athena Engineered Wood Study Table" },
      { title: "Fitness Band", value: "MI Smart Band 5" }
    ]
  },
  workedAt: {
    // add logos in static and at max add 3/4
    enabled: true,
    meta: [
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
