import { useGetSubscription } from '@/actions/subscriptions/use-get-subscription';
import { useSubscriptionModal } from '@/lib/store/use-subscription-modal';

export const usePaywall = () => {
  const { data: subscription, isLoading: isLoadingSubscription } =
    useGetSubscription();

  const subscriptionModal = useSubscriptionModal();

  const shouldBlock = isLoadingSubscription || !subscription?.active;

  return {
    isLoading: isLoadingSubscription,
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onOpen();
    }
  };
};
