import { coursePlans } from '../constants/coursePlans';

export const calculateAmount = (plan) => {
  const selectedPlan = coursePlans.find(p => p.id === plan);
  
  if (!selectedPlan) {
    return 0;
  }

  switch (plan) {
    case 'monthly':
      return selectedPlan.amount / selectedPlan.installments;
    case 'full':
      return selectedPlan.amount * (1 - selectedPlan.discount);
    case 'company':
      return selectedPlan.amount;
    default:
      return 0;
  }
};

export const calculateDiscount = (plan, amount) => {
  const selectedPlan = coursePlans.find(p => p.id === plan);
  
  if (!selectedPlan || !selectedPlan.discount) {
    return 0;
  }

  return amount * selectedPlan.discount;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

export const calculateInstallment = (amount, installments) => {
  return amount / installments;
};