import { Config } from '../settings/types';

export type CommunityUser = {
  community_id: number;
  user_id: number;
  role: any;
}

export type User = {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  createdAt: string;
  avatar?: string;
  isAdmin?: boolean;
  permissions: CommunityUser[];
};

export type Community = {
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
};

export type SessionContext = {
  storage: any;
  signing: boolean;
  isLogged: boolean;
  token?: string;
  loading: any;
  user: User;
  community?: Community;
  communities: Community[];
  config: Config;
  onChange: any;
  onChangeAsync: any;
  login: any;
  logout: any;
};

export type UserContext = {
  communities: Community[];
  user: User;
};
