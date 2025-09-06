import torontoImg from "../../assets/image 1.svg";
import startingPlayer1 from "../../assets/image 2.svg";
import startingPlayer2 from "../../assets/image 3.svg";
import startingPlayer3 from "../../assets/image 4.svg";
import startingPlayer4 from "../../assets/image 5.svg";
import startingPlayer5 from "../../assets/image 6.svg";

function CarouselImgs() {
  const starting_players = [
    startingPlayer1,
    startingPlayer2,
    startingPlayer3,
    startingPlayer4,
    startingPlayer5,
  ];
  return (
    <>
      {starting_players.map((starting_player) => (
        <div className="carousel-item w-1/3 h-80 " key={starting_player}>
          <img
            src={starting_player}
            alt="Starting Players"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </>
  );
}
export function Homepage() {
  return (
    <div className="w-full min-h-dvh flex flex-col">
      {/* Toronto Picture */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${torontoImg})`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl inter-med text-[var(--ref-primary-90)]">
              Toronto Raptors
            </h1>
            <p className="mb-5 inter-med">
              We The <span className="text-[var(--ref-primary-90)]">North</span>
            </p>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="divider before:bg-white after:bg-white px-4 my-10"></div>
      {/* Carousel */}
      <p className="w-full text-left text-[var(--ref-primary-90)] mx-4 py-4 inter-med text-[clamp(16px,2.5vw,2rem)]">
        Starting Players
      </p>
      <div className="carousel rounded-box mx-4">
        <CarouselImgs></CarouselImgs>
      </div>
      {/* Divider */}
      <div className="divider before:bg-white after:bg-white px-4 my-10"></div>
      {/* Time Table*/}
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        <li>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">1984</time>
            <div className="text-lg font-black">First Macintosh computer</div>
            The Apple Macintosh—later rebranded as the Macintosh 128K—is the
            original Apple Macintosh personal computer. It played a pivotal role
            in establishing desktop publishing as a general office function. The
            motherboard, a 9 in (23 cm) CRT monitor, and a floppy drive were
            housed in a beige case with integrated carrying handle; it came with
            a keyboard and single-button mouse.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end md:mb-10">
            <time className="font-mono italic">1998</time>
            <div className="text-lg font-black">iMac</div>
            iMac is a family of all-in-one Mac desktop computers designed and
            built by Apple Inc. It has been the primary part of Apple's consumer
            desktop offerings since its debut in August 1998, and has evolved
            through seven distinct forms
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">2001</time>
            <div className="text-lg font-black">iPod</div>
            The iPod is a discontinued series of portable media players and
            multi-purpose mobile devices designed and marketed by Apple Inc. The
            first version was released on October 23, 2001, about 8+1⁄2 months
            after the Macintosh version of iTunes was released. Apple sold an
            estimated 450 million iPod products as of 2022. Apple discontinued
            the iPod product line on May 10, 2022. At over 20 years, the iPod
            brand is the oldest to be discontinued by Apple
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end md:mb-10">
            <time className="font-mono italic">2007</time>
            <div className="text-lg font-black">iPhone</div>
            iPhone is a line of smartphones produced by Apple Inc. that use
            Apple's own iOS mobile operating system. The first-generation iPhone
            was announced by then-Apple CEO Steve Jobs on January 9, 2007. Since
            then, Apple has annually released new iPhone models and iOS updates.
            As of November 1, 2018, more than 2.2 billion iPhones had been sold.
            As of 2022, the iPhone accounts for 15.6% of global smartphone
            market share
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">2015</time>
            <div className="text-lg font-black">Apple Watch</div>
            The Apple Watch is a line of smartwatches produced by Apple Inc. It
            incorporates fitness tracking, health-oriented capabilities, and
            wireless telecommunication, and integrates with iOS and other Apple
            products and services
          </div>
        </li>
      </ul>
    </div>
  );
}
