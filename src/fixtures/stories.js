import React from 'react'
import {
  StarHalf,
  Web,
  AccessTime,
  Lock,
  Business,
  EuroSymbol,
  VerifiedUser
} from '@material-ui/icons'

export const stories = [
  {
    // First story
    inverted: true,
    badgeColor: "info",
    badgeIcon: StarHalf,
    title: "The Commercial Importance of Online Ratings & Reviews",
    titleColor: "info",
    body: (
      <p>
      Online ratings and reviews are absolutely critical to commercial success in today's economy. As early as 2012 a <a href="https://scholarship.sha.cornell.edu/chrpubs/5">study from Cornell University</a> showed that if a hotel on Tripadvisor could increase their average customer reviews by just one star, they could increase their prices by up to 11.2% without affecting their occupancy rate.
      </p>
    ),
    footerTitle: "Cornell University Study, 2012"
  },
  {
    // Second story
    badgeColor: "success",
    badgeIcon: Web,
    title: "The Reputation Portability Problem",
    titleColor: "success",
    body: (
      <p>
        Reputation data portability is a major problem as <a href="https://medium.com/doteveryone/exploring-portable-ratings-for-gig-workers-5632fd9b262e">documented</a> by <a href="https://doteveryone.org.uk">DotEveryone</a>, the London based, fairer internet think tank.
      </p>
    ),
    footerTitle: "DotEveryone, fairer internet think tank, Feb 2018"
  },
  {
    // Third story
    inverted: true,
    badgeColor: "warning",
    badgeIcon: AccessTime,
    title: "Broken Ratings & Reviews In the Gig Economy",
    titleColor: "warning",
    body: (
      <div>
        <p>
          Wired Magazine writes about the <a href="https://www.wired.com/story/how-to-fix-ratings-in-the-gig-economy">importance of enabling ratings and reviews portability</a> in the burgeoning gig economy.
        </p>
      </div>
    ),
    footer: (
      "Wired Magazine, Dec 2017"
    )
  },
  {
    // Fourth story
    badgeColor: "danger",
    badgeIcon: Lock,
    title: "Lack of Reputation Data Ownership & Control",
    titleColor: "danger",
    body: (
      <p>
        Sarah O’Connor at The Financial Times writes a highly informative piece on the importance of reputation and the current inability to port it across online platforms in the gig economy and how GDPR will help.
      </p>
    ),
    footer: (
      "Financial Times, April 2018"
    )
  },
  {
    // Third story
    inverted: true,
    badgeColor: "primary",
    badgeIcon: Business,
    title: "UK Government-Commissioned Independent Assessment of the Economy",
    titleColor: "primary",
    body: (
      <div>
        <p>
          The <a href="https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/627671/good-work-taylor-review-modern-working-practices-rg.pdf">Taylor Report</a>, a 2017 independent assessment of the UK economy commissioned directly by the UK government explicitly highlights the problem and urges the government to enact legislation to address the issue, stating: Government should strongly encourage gig platforms to enable individuals to be able to carry their verified approval ratings with them when they move from the platform and to share them with third parties.
        </p>
      </div>
    ),
    footer: (
      "Taylor Report, July 2017"
    )
  },
  {
    // Fourth story
    badgeColor: "info",
    badgeIcon: EuroSymbol,
    title: "European General Data Protection Regulation (GDPR) Legislation",
    titleColor: "info",
    body: (
      <p>
        European GDPR <a href="https://gdpr-info.eu/recitals/no-63/">data access rights</a> and <a href="https://www.i-scoop.eu/gdprarticle/gdpr-article-20-right-data-portability/">data portability legislation</a> enshrines the rights of EU citizens and businesses to access and port their reputation data.
      </p>
    ),
    footer: (
      "EU GDPR, May 2018"
    )
  },
  {
    // Fifth story
    inverted: true,
    badgeColor: "success",
    badgeIcon: VerifiedUser,
    title: "The Global Issue of Fake Reviews",
    titleColor: "success",
    body: (
      <p>
      In addition to solving the reputation ownership and portability problem, Chlu also helps solve the major global problem of fake reviews by leveraging proof of payment on blockchain.
      Fake reviews have been shown to be a huge problem on all major platforms:
      Up to 1 in 5 reviews on <a href="https://www.marketwatch.com/story/20-of-yelp-reviews-are-fake-2013-09-24">Yelp have been reported as fake</a>;
      The recent <a href="http://fortune.com/2017/12/10/tripadvisor-london-shed-fake-restaurant/">manipulation of TripAdvisor's ratings system</a> received global media coverage;
      The BBC again highlighted <a href="http://www.bbc.com/news/technology-43907695">the global problem</a> in April 2018;
      Buzzfeed wrote about the <a href="https://www.buzzfeed.com/nicolenguyen/amazon-fake-review-problem">industry of fake reviews on Amazon</a> in May 2018 and
      NPR recently <a href="https://www.npr.org/sections/money/2018/04/27/606528176/episode-838-a-series-of-mysterious-packages">documented</a> the continued massive problem on Taobao/Alibaba.

      </p>
    ),
    footer: (
      "Multiple Media Sources"
    )
  }


];