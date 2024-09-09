import { Schema, Document } from 'mongoose';

export interface FeatureDetails {
  img: string;
  title: string;
  additionalHeading: string;
  points: string[];
  extraImage: string;
}

export interface DataDetails {
  img: string;
  title: string;
  subtitle: string;
  about: string;
}

export interface BrandDetails {
  row1: { image: string }[];
  row2: { image: string }[];
  row3: { image: string }[];
}

export interface ReviewData {
  logo: string;
  author: string;
  stars: number;
  content: string;
}

export interface Questions {
  heading: string;
  answer: string;
}

export interface Logos {
  img: string;
}

export interface Tag {
  title1: string;
  title2: string;
  description: string;
  buttonText: string;
}

export interface LinkDetails {
  text: string;
  url: string;
}

export interface ContentDetails {
  heading: string;
  description: string;
  links: LinkDetails[];
}

export interface Home extends Document {
  features: FeatureDetails[];
  data: DataDetails[];
  brands: BrandDetails[];
  customerReviews: ReviewData[];
  questions: Questions[];
  logos: Logos[];
  contentArray: ContentDetails[];
  tagline: Tag[];
  deletedAt?: Date;
}

export const HomeSchema = new Schema<Home>({
  features: [
    {
      img: { type: String, required: true },
      title: { type: String, required: true },
      additionalHeading: { type: String, required: true },
      points: [{ type: String, required: true }],
      extraImage: { type: String, required: true }
    }
  ],
  data: [
    {
      img: { type: String, required: true },
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      about: { type: String, required: true }
    }
  ],
  brands: [
    {
      row1: [{ image: { type: String, required: true } }],
      row2: [{ image: { type: String, required: true } }],
      row3: [{ image: { type: String, required: true } }]
    }
  ],
  customerReviews: [
    {
      logo: { type: String, required: true },
      author: { type: String, required: true },
      stars: { type: Number, required: true },
      content: { type: String, required: true }
    }
  ],
  questions: [
    {
      heading: { type: String, required: true },
      answer: { type: String, required: true }
    }
  ],
  logos: [
    {
      img: { type: String, required: true }
    }
  ],
  contentArray: [
    {
      heading: { type: String, required: true },
      description: { type: String, required: true },
      links: [
        {
          text: { type: String, required: true },
          url: { type: String, required: true }
        }
      ]
    }
  ],
  tagline: [
    {
      title1: { type: String, required: true },
      title2: { type: String, required: true },
      description: { type: String, required: true },
      buttonText: { type: String, required: true }
    }
  ],
  deletedAt: { type: Date }
}, { timestamps: true });
