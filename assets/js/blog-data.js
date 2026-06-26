const createBlogPost = ({
  slug,
  category,
  dateLabel,
  readTime = '5 min read',
  title,
  excerpt,
  description,
  coverImage,
  coverAlt,
  sections,
  media = []
}) => ({
  slug,
  category,
  dateLabel,
  readTime,
  title,
  excerpt,
  description: description || excerpt,
  coverImage: `assets/images/blog/${coverImage}`,
  coverAlt: coverAlt || title,
  intro: [
    excerpt,
    'This article is part of the Marketing With a Flair blog library for home service brands, built to connect practical marketing choices with clearer growth decisions.'
  ],
  sections: sections.map((section, index) => ({
    heading: section.heading,
    copy: section.copy,
    media: media[index]
      ? {
          src: `assets/images/blog/${media[index].src}`,
          alt: media[index].alt || section.heading,
          fit: media[index].fit || 'cover'
        }
      : undefined
  })),
  quote: {
    text: 'Better marketing starts when the message, the channel, and the business goal all point in the same direction.',
    attribution: 'Marketing With a Flair'
  },
  closingCta: {
    title: 'Ready to sharpen your next move?',
    copy: 'Marketing With a Flair helps home service companies turn strategy, creative, and campaign planning into work that supports measurable growth.'
  }
});

window.MWF_BLOGS = [
  createBlogPost({
    slug: '2025-hashtag-holiday-calendar',
    category: 'Social Media Planning',
    dateLabel: '2025',
    readTime: '6 min read',
    title: '2025 Hashtag Holiday Calendar For Home Service Brands',
    excerpt: 'A practical calendar of seasonal and social media moments your team can use to plan timely posts, offers, and community content.',
    coverImage: '2025-hashtag-holiday-calendar.avif',
    sections: [
      {
        heading: 'Plan Content Before The Rush',
        copy: [
          'Hashtag holidays work best when they are planned before the day arrives. Build a monthly rhythm around the moments that fit your service area, team personality, and seasonal demand.',
          'The goal is not to post for every holiday. It is to choose the ones that help your brand stay visible, useful, and human.'
        ]
      },
      {
        heading: 'Turn Dates Into Local Stories',
        copy: [
          'Use the calendar as a prompt for technician highlights, safety reminders, maintenance tips, community moments, and seasonal service education.',
          'A small local story will usually outperform generic holiday graphics because it gives customers a reason to recognize your company.'
        ]
      },
      {
        heading: 'Keep The Monthly Mix Balanced',
        copy: [
          'Blend light engagement posts with service reminders, reviews, project proof, and campaign messaging. That balance keeps the feed active without making every post feel like an ad.'
        ]
      }
    ],
    media: [
      { src: '2025-calendar-jan.webp', alt: 'January 2025 hashtag holiday calendar', fit: 'contain' },
      { src: '2025-calendar-june.webp', alt: 'June 2025 hashtag holiday calendar', fit: 'contain' },
      { src: '2025-calendar-dec.webp', alt: 'December 2025 hashtag holiday calendar', fit: 'contain' }
    ]
  }),
  createBlogPost({
    slug: 'google-ai-calling-local-hvac',
    category: 'Local Search',
    dateLabel: '2025',
    readTime: '5 min read',
    title: 'Google AI Is Calling Local HVAC Companies. Is Your Team Ready?',
    excerpt: 'AI-assisted local search is changing how customers compare service providers, making clean business information and call handling more important than ever.',
    coverImage: 'google-ai-calling-local-hvac.webp',
    sections: [
      {
        heading: 'Local Information Has To Be Consistent',
        copy: [
          'AI-powered search experiences pull from business profiles, websites, reviews, and structured local signals. Inconsistent information can create friction before a customer ever calls.',
          'Make sure service areas, hours, categories, phone numbers, and core offers tell the same story everywhere.'
        ]
      },
      {
        heading: 'Calls Still Need Human Readiness',
        copy: [
          'Even as discovery changes, the handoff often becomes a phone call. Scripts, response speed, and clarity around next steps still decide whether attention becomes booked work.'
        ]
      },
      {
        heading: 'Reviews Shape Trust Faster',
        copy: [
          'Review quality, recency, and response patterns help searchers understand whether your company is credible. Treat reputation work as part of local SEO, not a separate chore.'
        ]
      }
    ]
  }),
  createBlogPost({
    slug: 'expiring-25c-hvac-tax-credit',
    category: 'Campaign Planning',
    dateLabel: '2025',
    readTime: '5 min read',
    title: 'The Expiring 25C HVAC Tax Credit: What Contractors Should Say Now',
    excerpt: 'When incentives change, HVAC brands need clear customer messaging that explains urgency without creating confusion or overpromising.',
    coverImage: 'expiring-25c-hvac-tax-credit.avif',
    sections: [
      {
        heading: 'Make The Deadline Easy To Understand',
        copy: [
          'Customers should not need to decode policy language before they understand why timing matters. Explain the practical impact in plain language and direct them to the right next step.',
          'Keep compliance-sensitive details careful and avoid making tax promises your team cannot guarantee.'
        ]
      },
      {
        heading: 'Connect Incentives To Planning',
        copy: [
          'The strongest message is not only about savings. It is about making a smart replacement decision before urgency, weather, and scheduling pressure collide.'
        ]
      },
      {
        heading: 'Equip Sales And Marketing Together',
        copy: [
          'Landing pages, email copy, call scripts, and comfort advisor talking points should match so the customer hears one consistent explanation.'
        ]
      }
    ]
  }),
  createBlogPost({
    slug: 'adapting-hvac-marketing-rising-costs',
    category: 'HVAC Marketing',
    dateLabel: '2025',
    readTime: '6 min read',
    title: 'Adapting HVAC Marketing To Rising Costs',
    excerpt: 'Rising costs change how homeowners evaluate service, replacement, financing, and trust. Your marketing has to answer those concerns directly.',
    coverImage: 'adapting-hvac-marketing-rising-costs.avif',
    sections: [
      {
        heading: 'Lead With Value, Not Panic',
        copy: [
          'When costs rise, customers need confidence that the recommendation is necessary, fair, and well explained. Marketing should reinforce the value behind the service, not simply push urgency.',
          'Use proof, education, financing clarity, and maintenance guidance to reduce hesitation.'
        ]
      },
      {
        heading: 'Segment Repair And Replacement Messaging',
        copy: [
          'Repair customers and replacement customers need different levels of detail. Split campaign messaging by need state so each audience sees the most relevant reason to act.'
        ]
      },
      {
        heading: 'Make Affordability Clear',
        copy: [
          'Financing language, membership benefits, rebates, and service options should be easy to find. Customers should understand the path forward before they call.'
        ]
      }
    ]
  }),
  createBlogPost({
    slug: 'millennials-demand-transparency',
    category: 'Customer Experience',
    dateLabel: '2025',
    readTime: '5 min read',
    title: 'Millennials Demand Transparency From Home Service Brands',
    excerpt: 'Younger homeowners expect clearer pricing, better communication, and proof before they choose a home service company.',
    coverImage: 'millennials-demand-transparency.avif',
    sections: [
      {
        heading: 'Trust Is Built Before The Appointment',
        copy: [
          'Customers look for reviews, photos, service explanations, pricing context, and signs that the company communicates clearly. If those signals are missing, they keep shopping.',
          'Marketing should remove uncertainty before the first call.'
        ]
      },
      {
        heading: 'Show The Process',
        copy: [
          'Explain what happens after a customer books, who arrives, what they inspect, and how recommendations are presented. Process clarity makes the brand feel safer.'
        ]
      },
      {
        heading: 'Use Proof With Specifics',
        copy: [
          'Generic claims are easy to ignore. Specific reviews, technician stories, project examples, and response expectations help transparency feel real.'
        ]
      }
    ]
  }),
  createBlogPost({
    slug: 'nexstar-training-close-rate-feedback',
    category: 'Sales Enablement',
    dateLabel: '2025',
    readTime: '5 min read',
    title: 'Nexstar Training, Close Rate, And The Feedback Loop Marketing Needs',
    excerpt: 'Marketing gets stronger when sales training, lead quality, close-rate feedback, and campaign reporting are treated as one connected system.',
    coverImage: 'nexstar-training-close-rate-feedback.png',
    sections: [
      {
        heading: 'Marketing Should Hear The Sales Floor',
        copy: [
          'Lead quality cannot be judged by form fills alone. Sales feedback shows whether campaign promises, targeting, and customer expectations are aligned.',
          'When teams share close-rate context, marketing can adjust messages before wasted spend compounds.'
        ]
      },
      {
        heading: 'Use Training Insights In Campaigns',
        copy: [
          'Common objections, strong talk tracks, and customer questions can all become better landing page copy, emails, and ad angles.'
        ]
      },
      {
        heading: 'Review Results Together',
        copy: [
          'Regular campaign reviews should include booked calls, close rates, average ticket, and customer fit so marketing decisions stay tied to revenue.'
        ]
      }
    ]
  }),
  createBlogPost({
    slug: 'membership-programs-winning',
    category: 'Retention',
    dateLabel: '2025',
    readTime: '5 min read',
    title: 'Why Membership Programs Are Winning For Home Service Brands',
    excerpt: 'Membership programs can stabilize demand, strengthen retention, and give customers a clearer reason to stay connected between service calls.',
    coverImage: 'membership-programs-winning.webp',
    sections: [
      {
        heading: 'Retention Needs A Clear Promise',
        copy: [
          'A strong membership is more than a discount. It gives customers peace of mind, priority, reminders, and a reason to keep the relationship active.',
          'The offer should be simple enough for the team to explain and valuable enough for customers to remember.'
        ]
      },
      {
        heading: 'Campaigns Should Support The Lifecycle',
        copy: [
          'Promote signups, onboard new members, remind them of benefits, and build renewal messaging before the decision becomes cold.'
        ]
      },
      {
        heading: 'Use Membership Data Better',
        copy: [
          'Membership lists can inform seasonal campaigns, referral asks, review requests, and proactive service reminders when the data is kept clean.'
        ]
      }
    ]
  }),
  createBlogPost({
    slug: 'maximizing-hvac-business-revenue',
    category: 'Revenue Growth',
    dateLabel: '2025',
    readTime: '6 min read',
    title: 'Maximizing HVAC Business Revenue With Smarter Marketing',
    excerpt: 'Revenue growth depends on more than demand generation. It takes the right offer mix, customer journey, reporting, and operational follow-through.',
    coverImage: 'maximizing-hvac-business-revenue.avif',
    sections: [
      {
        heading: 'Look Beyond Lead Volume',
        copy: [
          'A campaign can generate attention and still fail the business if it does not produce the right calls. Revenue-focused marketing looks at fit, urgency, service line, and close potential.',
          'That makes campaign quality as important as campaign quantity.'
        ]
      },
      {
        heading: 'Build Around High-Value Moments',
        copy: [
          'Replacement opportunities, maintenance memberships, seasonal tune-ups, and reactivation campaigns each need a different message and route to conversion.'
        ]
      },
      {
        heading: 'Tie Reporting To Decisions',
        copy: [
          'Reports should help leadership decide where to spend, what to pause, what to improve, and how marketing supports the next revenue goal.'
        ]
      }
    ]
  }),
  createBlogPost({
    slug: 'mwf-ranking-arizona-top-ten',
    category: 'Company News',
    dateLabel: '2025',
    readTime: '4 min read',
    title: 'Marketing With a Flair Ranked In Arizona Top Ten',
    excerpt: 'Recognition matters most when it reflects the strategy, service, and client trust behind the work.',
    coverImage: 'mwf-ranking-arizona-top-ten.avif',
    sections: [
      {
        heading: 'A Recognition Built On Client Work',
        copy: [
          'Awards are not the strategy, but they can reflect the consistency behind it. For MWF, recognition connects back to the brands, campaigns, and relationships that shape the work every day.',
          'The real measure is whether marketing helps clients grow with more clarity and accountability.'
        ]
      },
      {
        heading: 'Why Local Credibility Matters',
        copy: [
          'Home service brands need partners who understand local markets, reputation, community trust, and practical business goals.'
        ]
      },
      {
        heading: 'Keeping Momentum Useful',
        copy: [
          'Recognition should become fuel for better systems, stronger creative, and continued service to the businesses that trust the team.'
        ]
      }
    ]
  }),
  createBlogPost({
    slug: 'mwf-dream-team',
    category: 'Company Culture',
    dateLabel: '2025',
    readTime: '4 min read',
    title: 'The MWF Dream Team Behind The Strategy',
    excerpt: 'Strong marketing work comes from a team that can connect creative ideas, data, client realities, and disciplined execution.',
    coverImage: 'mwf-dream-team.webp',
    sections: [
      {
        heading: 'Strategy Is A Team Sport',
        copy: [
          'Marketing gets stronger when creative, analytics, account strategy, and operations work from the same playbook. That alignment helps ideas become campaigns clients can actually use.',
          'The best work happens when the team understands both the brand story and the business pressure behind it.'
        ]
      },
      {
        heading: 'Client Context Matters',
        copy: [
          'Every service company has different capacity, markets, tools, and goals. A good team listens before it builds.'
        ]
      },
      {
        heading: 'Execution Carries The Idea',
        copy: [
          'Creative direction only matters when deadlines, details, follow-up, and measurement support it.'
        ]
      }
    ]
  }),
  createBlogPost({
    slug: 'consumer-confidence-index',
    category: 'Market Trends',
    dateLabel: '2025',
    readTime: '5 min read',
    title: 'What The Consumer Confidence Index Means For Home Services',
    excerpt: 'Consumer confidence can influence how homeowners respond to repairs, replacements, financing, and discretionary upgrades.',
    coverImage: 'consumer-confidence-index.jpg',
    sections: [
      {
        heading: 'Confidence Changes Buying Behavior',
        copy: [
          'When customers feel uncertain, they may delay larger decisions, compare more options, or need more reassurance before booking.',
          'Marketing should account for that mindset with clearer proof, stronger financing context, and better urgency framing.'
        ]
      },
      {
        heading: 'Adjust The Message To The Moment',
        copy: [
          'High-confidence periods can support growth offers, while lower-confidence periods may require value, necessity, maintenance, and trust-building messages.'
        ]
      },
      {
        heading: 'Watch Local Signals Too',
        copy: [
          'National indicators matter, but local weather, housing, employment, and customer history should shape the final campaign plan.'
        ]
      }
    ]
  }),
  createBlogPost({
    slug: 'data-efficiency-customer',
    category: 'Analytics',
    dateLabel: '2025',
    readTime: '5 min read',
    title: 'Data Efficiency: Turning Customer Information Into Better Campaigns',
    excerpt: 'Customer data becomes valuable when it helps teams segment, personalize, follow up, and measure results with less waste.',
    coverImage: 'data-efficiency-customer.avif',
    sections: [
      {
        heading: 'Clean Data Creates Better Audiences',
        copy: [
          'A customer list is only useful when the fields are accurate enough to support real decisions. Service history, membership status, estimate data, and timing all matter.',
          'Better data hygiene leads to better campaign relevance.'
        ]
      },
      {
        heading: 'Personalization Should Be Practical',
        copy: [
          'Use data to make outreach more timely and useful, not complicated for its own sake. The best segmentation supports a clear message and offer.'
        ]
      },
      {
        heading: 'Measure What Improves The Next Campaign',
        copy: [
          'Review campaign results by audience, offer, service line, and booked revenue so each send makes the next one smarter.'
        ]
      }
    ]
  }),
  createBlogPost({
    slug: 'improve-website-seo',
    category: 'SEO',
    dateLabel: '2025',
    readTime: '6 min read',
    title: 'How To Improve Website SEO Without Losing The Human Story',
    excerpt: 'Better SEO should make your website clearer for both search engines and customers, not flatten the brand into keyword stuffing.',
    coverImage: 'improve-website-seo.png',
    sections: [
      {
        heading: 'Start With Page Purpose',
        copy: [
          'Every page should answer a real customer question or support a real service decision. SEO works better when the page has a job beyond ranking.',
          'Clarify the service, geography, proof, and action before adding more copy.'
        ]
      },
      {
        heading: 'Use Keywords As Signals',
        copy: [
          'Keywords help organize the page, but the writing still needs to sound like a helpful company explaining what it does.'
        ]
      },
      {
        heading: 'Make Conversion Easy',
        copy: [
          'Calls, forms, reviews, trust blocks, and service explanations should work together so organic traffic has a clear next step.'
        ]
      }
    ]
  }),
  createBlogPost({
    slug: 'cat-on-laptop-seo',
    category: 'SEO',
    dateLabel: '2025',
    readTime: '4 min read',
    title: 'What A Cat On A Laptop Can Teach Us About SEO',
    excerpt: 'SEO can feel messy, distracted, and overloaded. A simpler structure often makes the biggest difference.',
    coverImage: 'cat-on-laptop-seo.webp',
    sections: [
      {
        heading: 'Simplify The Crawl Path',
        copy: [
          'Search engines and customers both benefit from a website that is easy to understand. Clear navigation, focused service pages, and useful internal links reduce confusion.',
          'The basics are not boring when they help people find what they need.'
        ]
      },
      {
        heading: 'Remove Unhelpful Clutter',
        copy: [
          'Extra pages, thin copy, duplicate sections, and unclear calls to action can distract from the strongest conversion path.'
        ]
      },
      {
        heading: 'Keep Testing The Experience',
        copy: [
          'SEO is not only rankings. It is also whether visitors can move from search intent to confidence to action.'
        ]
      }
    ]
  }),
  createBlogPost({
    slug: 'mastering-eeat-home-service-pros',
    category: 'SEO',
    dateLabel: '2024',
    readTime: '6 min read',
    title: 'Mastering E-E-A-T For Home Service Pros',
    excerpt: 'Experience, expertise, authority, and trust should show up in your website content, reviews, team proof, and local reputation signals.',
    coverImage: 'mastering-eeat-home-service-pros.avif',
    sections: [
      {
        heading: 'Show Real Experience',
        copy: [
          'Homeowners want evidence that your team understands the problem. Use project examples, technician expertise, service-area proof, and practical explanations.',
          'Specific experience is stronger than generic claims.'
        ]
      },
      {
        heading: 'Make Authority Visible',
        copy: [
          'Certifications, partnerships, years in business, community involvement, and reviews all help customers understand why your company is credible.'
        ]
      },
      {
        heading: 'Build Trust Near The Decision',
        copy: [
          'Trust signals should appear close to forms, calls, pricing explanations, and service recommendations where hesitation is highest.'
        ]
      }
    ]
  }),
  createBlogPost({
    slug: 'eeat-home-service-seo',
    category: 'SEO',
    dateLabel: '2024',
    readTime: '5 min read',
    title: 'E-E-A-T And Home Service SEO',
    excerpt: 'Search visibility improves when your site proves who you are, what you know, where you work, and why customers trust you.',
    coverImage: 'eeat-home-service-seo.webp',
    sections: [
      {
        heading: 'Trust Signals Need Placement',
        copy: [
          'Reviews, licenses, badges, warranties, and service guarantees should not be hidden. Put them where customers are deciding whether to call.',
          'E-E-A-T becomes more useful when it improves both SEO and conversion.'
        ]
      },
      {
        heading: 'Local Proof Matters',
        copy: [
          'Service-area pages, project references, local photos, and community content help reinforce that your company is active in the markets it serves.'
        ]
      },
      {
        heading: 'Keep Content Helpful',
        copy: [
          'Helpful content answers real questions and supports practical decisions. That is the version of SEO most likely to build durable trust.'
        ]
      }
    ]
  }),
  createBlogPost({
    slug: 'elements-2024-marketing',
    category: 'Marketing Strategy',
    dateLabel: '2024',
    readTime: '6 min read',
    title: 'The Elements Of A Strong 2024 Marketing Plan',
    excerpt: 'A strong marketing plan connects goals, budget, creative, channels, reporting, and customer experience into one usable roadmap.',
    coverImage: 'elements-2024-marketing.webp',
    sections: [
      {
        heading: 'Start With Business Goals',
        copy: [
          'Marketing planning should begin with the revenue, service-line, and market goals leadership actually needs to hit.',
          'That keeps campaign choices grounded instead of scattered across disconnected tactics.'
        ]
      },
      {
        heading: 'Build The Channel Mix Intentionally',
        copy: [
          'SEO, paid search, social, email, traditional media, and retention campaigns each have a role. The plan should explain why each one belongs.'
        ]
      },
      {
        heading: 'Report Against Decisions',
        copy: [
          'A useful report helps the team decide what to keep, cut, change, or test next.'
        ]
      }
    ]
  }),
  createBlogPost({
    slug: 'being-smart-2024-marketing',
    category: 'Marketing Strategy',
    dateLabel: '2024',
    readTime: '5 min read',
    title: 'Being Smart With 2024 Marketing',
    excerpt: 'Smart marketing is not louder marketing. It is clearer positioning, better timing, stronger measurement, and decisions tied to the business goal.',
    coverImage: 'being-smart-2024-marketing.webp',
    sections: [
      {
        heading: 'Choose Fewer Priorities Better',
        copy: [
          'Trying to do everything at once can weaken the work. Choose the campaigns that match current capacity, market demand, and revenue priorities.',
          'Focus helps teams execute with more consistency.'
        ]
      },
      {
        heading: 'Use Data Without Losing Judgment',
        copy: [
          'Data should guide decisions, but context still matters. Weather, seasonality, operations, and team capacity all shape what the numbers mean.'
        ]
      },
      {
        heading: 'Keep Creative Accountable',
        copy: [
          'Creative should be memorable, but it also needs a job: clarify the offer, build trust, and move the customer toward action.'
        ]
      }
    ]
  }),
  createBlogPost({
    slug: 'navigating-2024-home-service-marketing',
    category: 'Home Service Marketing',
    dateLabel: '2024',
    readTime: '6 min read',
    title: 'Navigating 2024 Home Service Marketing',
    excerpt: 'Home service brands need marketing plans that can handle changing costs, customer expectations, search behavior, and seasonal pressure.',
    coverImage: 'navigating-2024-home-service-marketing.avif',
    sections: [
      {
        heading: 'Stay Flexible Without Getting Random',
        copy: [
          'Markets shift quickly, but constant reaction can create chaos. A good plan leaves room to adjust while keeping the core strategy intact.',
          'That means clear priorities, review rhythms, and campaign guardrails.'
        ]
      },
      {
        heading: 'Balance Acquisition And Retention',
        copy: [
          'New leads matter, but existing customers are often the fastest path to steadier revenue through memberships, reminders, reviews, and referrals.'
        ]
      },
      {
        heading: 'Make Reporting More Useful',
        copy: [
          'Track the numbers that help the business decide what to improve next, not just the metrics that are easiest to export.'
        ]
      }
    ]
  })
];
