import { useCustomMutation, useGetIdentity } from "@refinedev/core";
import { EActionType, ETargetType } from "../../models/interaction";
import { User } from "@models/charity";

export interface IInteractionPayload {
  targetType: ETargetType;
  targetId: string | number;
  action: EActionType;
  metadata?: Record<string, any>;
}

export const useInteraction = () => {
  const { mutate, isLoading } = useCustomMutation<any>();
  const { data: user } = useGetIdentity<User>();

  const interact = (payload: IInteractionPayload) => {
    mutate({
      url: "interactions",
      method: "post",
      values: {
        target_type: payload.targetType,
        target_id: payload.targetId,
        action_type: payload.action,
        user_id: user?.id,
      },
    });
  };

  const voteCampaign = (campaignId: string | number) => {
    interact({
      targetType: ETargetType.CAMPAIGN,
      targetId: campaignId,
      action: EActionType.VOTE,
    });
  };

  const voteOrganization = (organizationId: string | number) => {
    interact({
      targetType: ETargetType.ORGANIZATION,
      targetId: organizationId,
      action: EActionType.VOTE,
    });
  };

  const viewCampaign = (campaignId: string | number) => {
    interact({
      targetType: ETargetType.CAMPAIGN,
      targetId: campaignId,
      action: EActionType.CLICK,
    });
  };

  const viewOrganization = (organizationId: string | number) => {
    interact({
      targetType: ETargetType.ORGANIZATION,
      targetId: organizationId,
      action: EActionType.CLICK,
    });
  };

  const donate = (campaignId: string | number) => {
    interact({
      targetType: ETargetType.CAMPAIGN,
      targetId: campaignId,
      action: EActionType.DONATE,
    });
  };

  return {
    interact,
    donate,
    isLoading,
    voteCampaign,
    viewCampaign,
    viewOrganization,
    voteOrganization,
  };
};
