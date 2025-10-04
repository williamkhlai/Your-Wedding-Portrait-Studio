import { WeddingStyle } from './types';

export const WEDDING_STYLES: WeddingStyle[] = [
  {
    id: 'classic-elegance',
    name: 'Classic Elegance',
    description: 'Create a timeless and sophisticated wedding portrait. The bride is wearing an exquisite A-line or ball gown with intricate lace details and a long veil. The groom is in a sharp, classic black tuxedo with a bow tie. They are posed elegantly in front of a majestic historic mansion, surrounded by a manicured garden with lush greenery and blooming flowers. The lighting should be soft and romantic, evoking a sense of grace and enduring love.',
    scenes: [
        { id: 'historic-mansion', name: 'Historic Mansion' },
        { id: 'catholic-church', name: 'Catholic Church' }
    ],
  },
  {
    id: 'rustic-charm',
    name: 'Rustic Charm',
    description: 'Generate a warm, romantic photo with a rustic charm theme. The bride wears a flowing, vintage-inspired lace dress with wildflowers in her hair. The groom is dressed in a tweed vest, suspenders, and a bow tie for a timeless look. They are standing in a beautifully decorated barn with string lights, exposed wooden beams, and lush greenery. The atmosphere is cozy, intimate, and filled with the golden light of a late afternoon.',
    scenes: [
        { id: 'decorated-barn', name: 'Decorated Barn' },
        { id: 'forest-clearing', name: 'Forest Clearing Ceremony' }
    ],
  },
  {
    id: 'beach-bliss',
    name: 'Beach Bliss',
    description: 'Casual, airy attire with barefoot moments on the sand, waves crashing in the background. The couple shares a romantic moment with the sunset.',
    scenes: [
        { id: 'tropical-paradise', name: 'Tropical Paradise' },
        { id: 'sunset-beach', name: 'Sunset Beach' }
    ],
  },
  {
    id: 'glamorous-night',
    name: 'Glamorous Night Out',
    description: 'Create a glamorous and dramatic wedding photo inside a luxury hotel. The bride wears a sleek, sparkling evening gown, and the groom is in a modern, tailored tuxedo. They are sharing a sophisticated moment in a grand hotel ballroom with crystal chandeliers and opulent decor. The mood is chic, romantic, and celebratory.',
    scenes: [
        { id: 'luxury-hotel', name: 'Luxury Hotel' },
        { id: 'urban-rooftop', name: 'Urban Rooftop' }
    ],
  },
  {
    id: 'whimsical-wonderland',
    name: 'Whimsical Wonderland',
    description: 'A magical and playful theme. The bride and groom are in unique, imaginative outfits, set within an enchanted forest filled with fairy lights and fantastical elements.',
    scenes: [
        { id: 'enchanted-forest', name: 'Enchanted Forest' },
        { id: 'vintage-carnival', name: 'Vintage Carnival Extravaganza' }
    ],
  },
  {
    id: 'cultural-heritage',
    name: 'Cultural Heritage',
    description: 'Celebrate cultural heritage with a vibrant wedding photo. The couple is dressed in elaborate and colorful traditional Asian wedding attire. They are posed in front of a magnificent and ornate temple with intricate architecture. The scene is rich with color, tradition, and joyful celebration, capturing the beauty of their heritage.',
    scenes: [
        { id: 'asia-temple', name: 'Asia Temple' },
        { id: 'shinto-shrine', name: 'Japanese Shinto Shrine' },
        { id: 'mexican-fiesta', name: 'Mexican Fiesta' },
        { id: 'west-african', name: 'Classic West African Celebration' }
    ],
  },
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    description: 'Capture a modern, minimalist aesthetic. The bride is in a chic, simple, and elegant gown with clean lines. The groom wears a perfectly tailored suit in a contemporary color like navy or charcoal grey. They are posed against a backdrop of striking modern architecture, emphasizing geometric shapes and negative space. The style is sophisticated, clean, and effortlessly cool.',
    scenes: [
        { id: 'modern-architecture', name: 'Modern Architecture' },
        { id: 'urban-loft', name: 'Sleek Urban Loft' },
        { id: 'contemporary-gallery', name: 'Contemporary Gallery' },
        { id: 'simple-studio', name: 'Very Simple Studio' }
    ],
  },
  {
    id: 'adventurous-spirit',
    name: 'Adventurous Spirit',
    description: 'Generate a photo for an adventurous couple in a stunning forest setting. The bride and groom, in wedding attire that allows for movement (e.g., flowing dress, no tie), are captured amidst tall trees and dappled sunlight. The image should showcase their love for nature and adventure, with a feeling of romance and discovery.',
    scenes: [
        { id: 'enchanting-forest', name: 'Enchanting Forest' },
        { id: 'desert-oasis', name: 'Desert Oasis' },
        { id: 'lakeside-camping', name: 'Lakeside Camping' },
        { id: 'mountain-summit', name: 'Mountain Summit' }
    ],
  },
  {
    id: 'vintage-romance',
    name: 'Vintage Romance',
    description: 'The bride in a vintage-inspired dress and the groom in a retro suit, styled with classic props and a sepia tone.',
    scenes: [
        { id: 'retro-cafes', name: 'Retro Cafés' },
        { id: 'train-station', name: 'Vintage Train Station' },
        { id: 'old-hollywood', name: 'Old Hollywood Glamour Affair' }
    ],
  },
  {
    id: 'fairy-tale-fantasy',
    name: 'Fairy Tale Fantasy',
    description: 'Create a dreamlike fairy tale photo. The bride is a princess in a magnificent ball gown with a sparkling tiara. The groom is her charming prince in regal attire. They are standing on the grounds of a breathtaking, enchanting castle, complete with towers and majestic architecture. The atmosphere is magical and romantic, as if taken from the pages of a storybook.',
    scenes: [
        { id: 'castle-grounds', name: 'Castle Grounds' },
        { id: 'magical-garden', name: 'Magical Garden Wonderland' },
        { id: 'medieval-courtyard', name: 'Medieval-Inspired Courtyard' }
    ],
  },
];