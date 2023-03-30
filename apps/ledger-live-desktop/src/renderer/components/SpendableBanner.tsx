import React from "react";
import styled from "styled-components";
import { Trans } from "react-i18next";
import { Account, AccountLike, TransactionCommon } from "@ledgerhq/types-live";
import { urls } from "~/config/urls";
import Alert from "./Alert";
import SpendableAmount from "./SpendableAmount";

// FormattedVal is a div, we want to avoid having it on a second line
const TextContent = styled.div`
  display: inline-flex;
`;
type Props = {
  account: AccountLike;
  transaction: TransactionCommon;
  parentAccount: Account | undefined | null;
};
const SpendableBanner = ({ account, parentAccount, transaction }: Props) => (
  <Alert type="secondary" small learnMoreUrl={urls.maxSpendable} learnMoreOnRight>
    <TextContent>
      <Trans i18nKey="send.steps.amount.banner" />
      <SpendableAmount
        account={account}
        parentAccount={parentAccount}
        transaction={transaction}
        prefix=" ~"
      />
    </TextContent>
  </Alert>
);
export default SpendableBanner;
