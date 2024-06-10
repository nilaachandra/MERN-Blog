import React, { useRef } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { PiPopcorn } from "react-icons/pi";
import { IoEyeSharp } from "react-icons/io5";
import BlogCard from "../components/BlogCard";

const Blog = ({
  title,
  image,
  postedAt,
  author,
  category,
  content,
  popcorn,
  views,
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggeredChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const Section = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
      <motion.section
        ref={ref}
        variants={item}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="mb-8"
      >
        {children}
      </motion.section>
    );
  };

  return (
    <div className="w-full min-h-screen py-4">
      <div className="flex my-3 items-center cursor-pointer">
        <MdArrowBackIos size={20} />
        <Link to="/" className="text-base hover:underline">
          Back
        </Link>
      </div>
      <motion.div className="body">
        <motion.h1
          className="lg:text-5xl text-3xl font-bold heading"
          variants={item}
          initial="hidden"
          animate="show"
        >
          {title || "The Benefits of Playing Football"}
        </motion.h1>
        <motion.div
          className="flex justify-between items-end"
          variants={item}
          initial="hidden"
          animate="show"
        >
          <div className="my-2">
            <h1 className="text-lg">
              By: <span>{author || "Nila Chandra Laishram"}</span>
            </h1>
            <h1 className="text-lg">
              Posted at: <span>{postedAt || "8th August 2023, 12:47 PM"}</span>
            </h1>
          </div>
          <h1 className="text-lg my-2">{category || "General"}</h1>
        </motion.div>
        <motion.img
          src={
            image ||
            `https://i.pinimg.com/736x/76/e2/e0/76e2e02e8707d726cac61d19aef87906.jpg`
          }
          alt=""
          className="w-full lg:h-[600px] object-cover"
          variants={item}
          initial="hidden"
          animate="show"
        />
        <motion.div className="content" variants={container}>
          {content || (
            <main className="container mt-4">
              <Section>
                <p className="mb-4">
                  Football, known as soccer in some parts of the world, is the
                  most popular sport globally, captivating billions of fans and
                  players. While the excitement of the game itself is
                  undeniable, the benefits of playing football extend far beyond
                  the pitch. Whether you're a professional athlete, a weekend
                  warrior, or a young enthusiast, engaging in football offers a
                  multitude of physical, mental, and social advantages. Let's
                  delve into the myriad benefits of playing this beautiful game.
                </p>
              </Section>
              <Section>
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  Physical Health Benefits
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      Cardiovascular Fitness
                    </h3>
                    <p>
                      Football is an excellent way to improve cardiovascular
                      health. The constant running, sprinting, and jogging
                      involved in a match provide a high-intensity aerobic
                      workout, which strengthens the heart, reduces blood
                      pressure, and lowers the risk of heart disease.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      Strength and Endurance
                    </h3>
                    <p>
                      The sport requires a combination of strength, speed, and
                      stamina. Regular play builds muscle strength, particularly
                      in the legs, core, and upper body. Additionally, the
                      varied pace of the game improves overall endurance.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      Flexibility and Coordination
                    </h3>
                    <p>
                      Dribbling, passing, and shooting the ball require a high
                      level of coordination and flexibility. These skills
                      improve with practice, enhancing overall motor skills and
                      body awareness.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      Weight Management
                    </h3>
                    <p>
                      The high-intensity nature of football helps burn calories
                      efficiently, making it an effective way to manage weight.
                      Combined with a balanced diet, regular play can help
                      maintain a healthy body weight.
                    </p>
                  </div>
                </div>
              </Section>
              <Section>
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  Mental Health Benefits
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      Stress Relief
                    </h3>
                    <p>
                      Playing football can be a great stress reliever. Physical
                      activity triggers the release of endorphins, the body’s
                      natural mood lifters. The focus required during the game
                      also helps take your mind off daily stressors.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      Mental Resilience
                    </h3>
                    <p>
                      Football teaches important life skills such as
                      perseverance, discipline, and goal-setting. Overcoming
                      challenges on the field can translate to better coping
                      mechanisms in everyday life.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      Cognitive Function
                    </h3>
                    <p>
                      The game enhances cognitive skills like concentration,
                      decision-making, and strategic thinking. Players need to
                      constantly assess situations, make quick decisions, and
                      anticipate opponents' moves, which sharpens the mind.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      Social Interaction and Teamwork
                    </h3>
                    <p>
                      Football is inherently a team sport, fostering camaraderie
                      and communication. Working towards a common goal with
                      teammates builds social bonds and improves communication
                      skills.
                    </p>
                  </div>
                </div>
              </Section>
              <Section>
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  Social Benefits
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      Community Building
                    </h3>
                    <p>
                      Football brings people together from diverse backgrounds,
                      creating a sense of community and belonging. Local clubs
                      and leagues offer opportunities to connect with others,
                      fostering friendships and community spirit.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      Inclusivity
                    </h3>
                    <p>
                      The sport is accessible to people of all ages, genders,
                      and skill levels. Inclusive by nature, football can be
                      played in various settings, from professional stadiums to
                      local parks, making it a universal activity.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      Role Models and Inspiration
                    </h3>
                    <p>
                      Watching and playing football provides access to role
                      models who inspire young players. Learning from
                      professionals and coaches helps instill values such as
                      hard work, dedication, and sportsmanship.
                    </p>
                  </div>
                </div>
              </Section>
              <Section>
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  Educational and Developmental Benefits
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      Discipline and Time Management
                    </h3>
                    <p>
                      Balancing football with academic or work commitments
                      teaches important life skills like discipline and time
                      management. Regular training schedules help players
                      develop a structured routine.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      Leadership Skills
                    </h3>
                    <p>
                      Captaining a team or leading on the field fosters
                      leadership qualities. Football encourages players to take
                      responsibility, make decisions, and motivate others,
                      skills that are valuable off the pitch as well.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      Cultural Awareness
                    </h3>
                    <p>
                      Football is a global sport, and playing it exposes
                      individuals to different cultures and perspectives.
                      International tournaments and multicultural teams promote
                      cultural awareness and understanding.
                    </p>
                  </div>
                </div>
              </Section>
              <Section>
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  Conclusion
                </h2>
                <p>
                  Football is much more than a sport; it is a catalyst for
                  physical health, mental well-being, social connections, and
                  personal development. Whether you're looking to improve your
                  fitness, relieve stress, make new friends, or develop
                  essential life skills, football offers a comprehensive range
                  of benefits. So, lace up your boots, hit the pitch, and
                  experience the transformative power of the beautiful game.
                </p>
              </Section>
            </main>
          )}
          <div className="views flex flex-col items-end">
            <div className="flex items-center w-full justify-between">
              <span className="flex items-center gap-2 cursor-pointer">
                <IoEyeSharp size={30} />
                {views || 27}
              </span>
              <span className="flex items-center gap-2 cursor-pointer text-lg">
                {popcorn || 27}
                <PiPopcorn size={30} />
              </span>
            </div>
          </div>

          <div className="related my-8">
            <h1 className="lg:text-4xl text-base body-bold font-bold">
              Related Blog
            </h1>
            <div
              id="recents"
              className="grid lg:grid-cols-3 grid-col-1 gap-3 my-2"
            >
              <BlogCard />
              <BlogCard />
              <BlogCard />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Blog;
