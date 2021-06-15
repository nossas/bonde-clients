import React from "react";
import { useMutation, gql } from "bonde-core-tools";
import { Header, Text, Button, toast } from "bonde-components";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

type Props = {
  remove: () => void;
  onClose: () => void;
  pressureTargetId: number;
};

const DELETE_PRESSURE_TARGET = gql`
  mutation DeletePressureTarget($id: Int_comparison_exp) {
    delete_pressure_targets(where: { id: $id }) {
      affected_rows
    }
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  & > button:first-child {
    padding-left: 0;
    justify-content: start;
  }
`;

const DeleteTargetPopup = ({
  remove,
  onClose,
  pressureTargetId
}: Props): React.ReactElement => {
  const { t } = useTranslation("widgetActions");
  const [deleteTarget] = useMutation(DELETE_PRESSURE_TARGET);
  const onSubmit = async (pressureTargetId: number) => {
    try {
      await deleteTarget({ variables: { id: { _eq: pressureTargetId } } });
      
      remove();
      onClose();
      
      return toast(t("settings.pressure.delete.success"), {
        type: toast.TYPE.SUCCESS,
      });
    } catch (e) {
      console.error(e);
      return toast(t("settings.pressure.delete.error"), {
        type: toast.TYPE.ERROR,
      });
    }
  };
  return (
    <>
      <Header.H2>{t('settings.pressure.delete.title')}</Header.H2>
      <Text style={{ margin: "20px 0" }}>
        {t('settings.pressure.delete.confirm')}
      </Text>
      <Box>
        <Button
          secondary
          onClick={onClose}
        >
          {t('settings.pressure.button.cancel')}
        </Button>
        <Button onClick={() => onSubmit(pressureTargetId)}>
          {t('settings.pressure.button.delete')}
        </Button>
      </Box>
    </>
  );
};

export default DeleteTargetPopup;
