interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Marketing Manager'],
  customerRoles: ['Customer'],
  tenantRoles: ['Business Owner', 'Customer Service Representative', 'Marketing Manager', 'Finance Manager'],
  tenantName: 'Provider',
  applicationName: 'Mobile Recharge App ',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Read user information',
    'Manage recharges',
    'Manage bill payments',
    'Raise customer service issues',
  ],
  ownerAbilities: ['Manage user data', 'Manage provider data', 'Manage recharge records', 'Manage bill payments'],
  getQuoteUrl: 'https://app.roq.ai/proposal/c99ef8dd-89e5-492c-b2f7-793ff69b8bc2',
};
