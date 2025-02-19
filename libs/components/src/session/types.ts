export interface BaseUIProperties {
  indexRoute: string;
  bgColor?: string;
  disableNavigation?: boolean;
  languageTool?: any;
  isMobile?: boolean;
  session: Session;
}

export interface Session {
  currentUser: User;
  communities: Community[];
  community: Community;
  updateSession: (key: string, value: any) => Promise<any>;
  apps: {
    settings: string;
    redes: string;
    chatbot: string;
    mobilization: string;
  };
  logout: () => void;
}

export interface User {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  createdAt: string;
  avatar?: string;
  isAdmin?: boolean;
}

export interface Community {
  id: number;
  name: string;
  city: string;
  description?: string;
  image?: string;
  created_at: string;
  updated_at: string;
  mailchimp_api_key?: string;
  mailchimp_list_id?: string;
  mailchimp_group_id?: string;
  fb_link?: string;
  twitter_link?: string;
  facebook_app_id?: string;
  email_template_from?: string;
  modules?: any;
  recipient?: any;
  signature?: {
    name: string;
    url: string;
  };
}
