import { useState } from "react";

function MainContentFootnotes() {
  const [showMath, setShowMath] = useState(false);

  const toggleShowMath = () => setShowMath((i) => !i);

  return (
    <footer>
      <ul>
        <li>
          This is <b>NOT</b> a real portfolio and these <b>sure-as-shit</b>{" "}
          aren't investment recommendations.{" "}
          <b>
            <u>
              Do your own homework before making a decision on something you see
              here.
            </u>
          </b>{" "}
          Seriously.
        </li>
        <li>
          How does it work? First, it pulls a list of posts from{" "}
          <a href="https://reddit.com/r/wallstreetbets" target="_blank">
            /r/wallstreetbets
          </a>{" "}
          based on filter selections.{" "}
          <a
            href="https://www.reddit.com/r/wallstreetbets/search/?q=flair%3ADD&restrict_sr=1&t=week&sort=top"
            target="_blank"
          >
            Just like this.
          </a>{" "}
          Then, it does its best to parse the <i>primary ticker</i> and
          sentiment score for each post through some fancy-shmancy coding.
          (Don't see TSLA or PLTR on your top weekly DD post filters?
          Boo-fucking-hoo, make a DD post about it, get a thousand upvotes, then
          come back... Why tf is FROG on here? Idk and idc, this thing isn't
          perfect, get over it)... Once all of the stonks have been scored and
          packaged, it drives off like an Amazon Prime delivery van speeding on
          Christmas Eve to go fetch some price tags... The price tag for each
          post is NOT exact. It's whatever open/close price it was closest to. I
          need funds deposited in my bank account if we want minute-precision
          data. Anything that doesn't have a price gets removed. The rest of it
          is just some basic maths that any 3rd grader can do.{" "}
          <button onClick={toggleShowMath}>
            Click here to {showMath ? "hide" : "show"} these elementary school
            maths...
          </button>
          {showMath ? (
            <ul>
              <li>shares = all post points totaled up</li>
              <li>
                weighted sentiment score = (post sentiment score * post points)
                for each post / shares
              </li>
              <li>
                average cost = (approx price around post timestamp * post
                points) for each post / shares
              </li>
              <li>
                total return = ((current price - average cost) / average cost) *
                100
              </li>
            </ul>
          ) : null}
        </li>
        <li>
          "But what about the emojis brooo? What do they mean? More Palantir?"
          🤔
        </li>
        <li>
          Like this? Check out my other web app called{" "}
          <a href="https://twentiment.com" target="_blank">
            twentiment
          </a>
          .
        </li>
        <li>
          <a href="https://buymeacoffee.com/nameer" target="_blank">
            If you really like this, consider supporting me through my
            buy-me-a-coffee link.
          </a>{" "}
          ...Yes, I did this all for free. I was hoping I'd be able to slap some
          Google AdSense on here, but they keep rejecting me because apparently
          this is "low-quality" content. I don't blame them. So, basically, I
          wasted two weekends putting this shit together for nothing. So sad.
          The least least you can do is buy me a coffee 🙏
        </li>
        <li>
          Last thing, if you want to contribute to this project,{" "}
          <a
            href="https://github.com/nameer-rizvi/stonks_public"
            target="_blank"
          >
            here's the github link
          </a>
          . The whole thing is in javascript, so unless you know how to
          javascript, stay on the bench, and{" "}
          <a href="https://www.reddit.com/message/compose/" target="_blank">
            pm me your genius ideas on reddit
          </a>
          . If you know github and see a stonk that isn't a stonk,{" "}
          <a
            href="https://github.com/nameer-rizvi/stonks_public/blob/main/lib/utils/stonkProcessorBlacklist.js"
            target="_blank"
          >
            make a pull request to add it to the black list here
          </a>
          .
        </li>
        <li>
          If I find out one of you fuckers cloned the repo only to put it up on
          your own domain with ads on it... God help me I'll be so fucking mad
          at you...
        </li>
      </ul>
    </footer>
  );
}

export default MainContentFootnotes;
