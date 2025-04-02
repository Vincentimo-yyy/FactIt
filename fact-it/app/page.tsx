import { FactCard } from '@/components/fact-card';

export default function Home() {
  const factCards = [
    {
      user: {
        name: 'Pedro San Pedro',
        avatar: '/placeholder.svg?height=40&width=40',
        verified: true,
      },
      tags: ['Politics', 'Personal'],
      credibilityScore: 71,
      headline:
        'Duterte refused fingerprinting and threatened lawsuits during chaotic arrest, Philippine police say',
      description:
        'A Philippine general says that ex-Philippine President Rodrigo Duterte threatened him with lawsuits, refused to be fingerprinted and told law enforcers "you have to kill me to bring me to jail."',
      references: [
        {
          id: 1,
          title: 'Independent article',
          url: 'https://www.independent.co.uk/news/world/rodrigo-duterte-the-hague-international-criminal-court-davao-manila-b2714419.html',
        },
        {
          id: 2,
          title: 'Independent article 2',
          url: 'https://www.independent.co.uk/news/rodrigo-duterte-icc-manila-netherlands-duterte-b2714419.html',
        },
      ],
      stats: {
        upvotes: 249,
        downvotes: 42,
        comments: 32,
        shares: 52,
      },
      timestamp: '2 hours ago',
    },
    {
      user: {
        name: 'JayJay Mariano',
        avatar: '/placeholder.svg?height=40&width=40',
        verified: false,
      },
      tags: ['Entertainment', 'Personal'],
      credibilityScore: 85,
      headline: 'New Marvel movie to begin filming next month, sources confirm',
      description:
        'Multiple industry insiders have confirmed that the next installment in the Marvel Cinematic Universe will begin production in Atlanta next month.',
      references: [
        {
          id: 1,
          title: 'Hollywood Reporter',
          url: 'https://www.example.com/marvel-movie-production-begins',
        },
      ],
      stats: {
        upvotes: 187,
        downvotes: 23,
        comments: 45,
        shares: 23,
      },
      timestamp: '5 hours ago',
    },
    {
      user: {
        name: 'Maow Mariano',
        avatar: '/placeholder.svg?height=40&width=40',
        verified: false,
      },
      tags: ['Entertainment', 'Personal'],
      credibilityScore: 85,
      headline: 'New Marvel movie to begin filming next month, sources confirm',
      description:
        'Multiple industry insiders have confirmed that the next installment in the Marvel Cinematic Universe will begin production in Atlanta next month.',
      references: [
        {
          id: 1,
          title: 'Hollywood Reporter',
          url: 'https://www.example.com/marvel-movie-production-begins',
        },
      ],
      stats: {
        upvotes: 187,
        downvotes: 31,
        comments: 45,
        shares: 23,
      },
      timestamp: '5 hours ago',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto overflow-auto">
      {/* Fact Cards */}
      <div className="space-y-4">
        {factCards.map((fact, index) => (
          <FactCard key={index} {...fact} />
        ))}
      </div>
    </div>
  );
}