import Image from 'next/image';
import { Award, BookOpen, Camera, Palette, GraduationCap, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  const skills = [
    {
      icon: Palette,
      title: 'Portrait Drawing',
      description: 'Specializing in detailed, lifelike pencil portraits that capture personality and emotion',
    },
    {
      icon: Sparkles,
      title: 'Landscape Art',
      description: 'Creating breathtaking landscape drawings with attention to light, shadow, and atmosphere',
    },
    {
      icon: BookOpen,
      title: 'Nature Studies',
      description: 'Intricate botanical and wildlife drawings combining scientific accuracy with artistic beauty',
    },
    {
      icon: Camera,
      title: 'Camera Operations',
      description: 'Professional camera operation and video production for journalism and events',
    },
  ];

  const education = [
    {
      institution: 'KIPS College',
      credential: 'Diploma in Journalism',
      description: 'Professional training in journalism, camera operations, and video editing',
    },
    {
      institution: 'ICM (International College of Management)',
      credential: 'Diploma Certificate',
      description: 'Advanced certification in media production and editing techniques',
    },
    {
      institution: 'Self-Taught Artist',
      credential: 'Pencil Art Mastery',
      description: 'Years of dedicated practice and refinement in portrait, landscape, and nature drawing',
    },
  ];

  const achievements = [
    'Over 100 commissioned artworks completed',
    'Featured in local art exhibitions',
    'Professional journalism projects documented',
    'Trusted by private collectors and corporate clients',
  ];

  return (
    <div className="bg-white">
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm font-semibold text-neutral-600 bg-neutral-200 px-4 py-2 rounded-full">
                  About Me
                </span>
              </div>
              <h1 className="text-5xl font-bold text-neutral-900 leading-tight">
                MaryStella Knight
              </h1>
              <div className="text-xl text-neutral-700 leading-relaxed space-y-4">
                <p>
                  I&apos;m a professional artist and journalist, bringing stories to life through both pencil and lens.
                  My journey as a self-taught artist has been driven by an unwavering passion for capturing
                  the beauty of the human form, the majesty of landscapes, and the delicate intricacies of nature.
                </p>
                <p>
                  With formal training in journalism from KIPS College and ICM, I combine technical expertise
                  in camera operations and editing with my artistic vision to create compelling visual narratives.
                  Whether I&apos;m drawing a portrait or documenting a story, my goal is always the same: to create
                  work that moves people and stands the test of time.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] bg-neutral-200">
                <Image
                  // src="https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  src="/stella-photo2 (1).jpg"
                  alt="MaryStella Knight - Artist at Work"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-neutral-900 text-white p-6 rounded-xl shadow-lg">
                <p className="text-sm mb-1">Operating as</p>
                <p className="text-2xl font-bold">Stella Arts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Areas of Expertise</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              A unique blend of artistic talent and technical proficiency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 p-3 bg-neutral-900 rounded-lg w-fit">
                    <skill.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {skill.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Education & Training</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Professional credentials and self-directed mastery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {education.map((edu, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="mb-4">
                    <GraduationCap className="h-10 w-10 text-neutral-900" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {edu.institution}
                  </h3>
                  <p className="text-neutral-700 font-semibold mb-3">
                    {edu.credential}
                  </p>
                  <p className="text-neutral-600 leading-relaxed">
                    {edu.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">My Approach</h2>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  Every artwork I create begins with a deep understanding of the subject. Whether it&apos;s
                  a portrait that needs to capture a person&apos;s essence, a landscape that evokes emotion,
                  or a nature study that celebrates detail, I approach each project with patience,
                  precision, and passion.
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  My journalism background has taught me the importance of storytelling and attention
                  to detail, qualities that enhance every piece of art I create. I believe in creating
                  timeless work that clients will treasure for generations.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Award className="h-6 w-6 mr-2" />
                  Notable Achievements
                </h3>
                <ul className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-neutral-300">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
