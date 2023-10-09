const mapping: Record<string, string> = {
  'bill-payments': 'bill_payment',
  cashbacks: 'cashback',
  'customer-services': 'customer_service',
  providers: 'provider',
  recharges: 'recharge',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
