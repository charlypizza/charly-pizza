export const LOCATIONS_QUERY = `*[_type == "location"] | order(order asc) {
  _id,
  name,
  address,
  "image": image.asset->url,
  mapUrl,
  deliveryUrl,
  clickCollectUrl,
  order
}`;

export const MENU_QUERY = `*[_type == "menuCategory"] | order(order asc) {
  _id,
  title,
  "image": image.asset->url,
  items[] {
    _key,
    name,
    description,
    price,
    "image": image.asset->url
  },
  order
}`;

export const GALLERY_QUERY = `*[_type == "gallery"][0] {
  _id,
  images[] {
    _key,
    "image": image.asset->url,
    alt
  }
}`;

export const INSTAGRAM_QUERY = `*[_type == "instagram"][0] {
  _id,
  profileUrl,
  posts[] {
    _key,
    "image": image.asset->url,
    alwaysColor
  }
}`;

export const HERO_QUERY = `*[_type == "hero"][0] {
  _id,
  title,
  subtitle,
  tagline,
  slides[] {
    _key,
    "image": image.asset->url,
    alt
  }
}`;

export const FOOTER_QUERY = `*[_type == "footer"][0] {
  _id,
  "logo": logo.asset->url,
  tagline,
  phone,
  locations[] {
    name,
    openingHours[] {
      days,
      hours
    }
  },
  legalMentions,
  cgv,
  privacyPolicy,
  cookieBannerText,
  copyrightText,
  createdByText,
  createdByUrl
}`;

export const HISTORY_QUERY = `*[_type == "history"][0] {
  _id,
  title,
  subtitle,
  "backgroundImage": backgroundImage.asset->url
}`;