import React, { useState } from "react";
import {
	Heading,
	Box,
	Text,
	Button,
	SwitchField,
	SelectField,
	Grid,
	GridItem,
	Stack,
	Flex
} from "bonde-components";
import { Modal } from "bonde-components";
import { useTranslation } from "react-i18next";

import ButtonStyled from "../../../../components/ButtonStyled";
import SpyField from "../../../../components/SpyField";
import { OptimizedPressure } from "../../../Community/Domains/Icons";
import { Widget } from "../../FetchWidgets";
import SettingsForm from '../SettingsForm';

type Props = {
	widget: Widget;
};

const ConfirmModal = ({ defaultIsOpen, onCancel }: any) => {
	const [isOpen, setIsOpen] = useState(defaultIsOpen);

	// useEffect serve para determinar que a propriedade 
	// defaultIsOpen tenha um peso maior que a propriedade isOpen
	// isOpen pode ser alterado, sempre que defaultIsOpen for alterado
	// devemos confirmar recalcular a possibilidade de abrir ou não o modal
	React.useEffect(() => {
		setIsOpen(defaultIsOpen)
	}, [defaultIsOpen])

	return (
		<Modal
			width="450px"
			isOpen={isOpen}
			onClose={() => {
				setIsOpen(false)
				onCancel()
			}}
		>
			<Heading as="h2" size="2xl">Desativar envio otimizado?</Heading>
			<Text>Isso pode gerar custos extras caso sua campanha ultrapasse 100.000 envios de e-mails.</Text>
			<div
				style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
			>
				<Button
					secondary
					align="left"
					type="button"
					onClick={() => {
						setIsOpen(false)
						onCancel()
					}}
				>
					Cancelar
				</Button>
				<Button type="button" onClick={() => setIsOpen(false)}>
					Desativar
				</Button>
			</div>
		</Modal>
	);
}

const Sending = ({ widget }: Props): React.ReactElement => {
	const { t } = useTranslation("widgetActions");

	return (
		<SettingsForm
			widget={widget}
			initialValues={{
				settings: {
					optimization_enabled: true,
					mail_limit: 1000,
					batch_limit: 50,
					...widget.settings
				}
			}}
		>
			{({ form, submitting, dirty }: any) => (
				<Box bg="white" p={6} boxShadow="sm">
					<Grid templateColumns="repeat(12, 1fr)" gap={6}>
						<GridItem colSpan={[null, 12, 12, 6]}>
							<Stack direction="column" spacing={4}>
								{/* <Visible lg xl> */}
								<OptimizedPressure />
								{/* </Visible> */}
								<div style={{ flex: 1 }}>
									<div style={{ marginBottom: "10px" }}>
										<Heading as="h3" size="lg">
											{t("settings.sending.title")}
										</Heading>
									</div>
									<Text style={{ marginBottom: "15px" }}>
										{t("settings.sending.subtitle")}
									</Text>

									<SwitchField
										defaultValue={widget.settings.optimization_enabled}
										name="settings.optimization_enabled"
										textOn="ATIVADO"
										textOff="DESATIVADO"
									/>

									<SpyField field="settings.optimization_enabled">
										{({ value, meta }) => (
											<ConfirmModal
												defaultIsOpen={!value && meta.modified}
												onCancel={() => {
													form.change("settings.optimization_enabled", true)
												}}
											/>
										)}
									</SpyField>
									<SelectField
										name='settings.mail_limit'
										label='Limite de envios únicos'
									>
										<option value={500}>500 pressões</option>
										<option value={1000}>1.000 pressões</option>
										<option value={5000}>5.000 pressões</option>
										<option value={10000}>10.000 pressões</option>
									</SelectField>

									<SelectField
										name='settings.batch_limit'
										label='Intervalo de envio'
									>
										<option value={50}>A cada 50 pressões</option>
										<option value={100}>A cada 100 pressões</option>
										<option value={500}>A cada 500 pressões</option>
										<option value={1000}>A cada 1.000 pressões</option>
									</SelectField>
									<Flex justify='end'>
										<ButtonStyled disabled={submitting || !dirty} type='submit'>{t('settings.defaultForm.submit')}</ButtonStyled>
									</Flex>
								</div>
							</Stack>
						</GridItem>
						<GridItem colSpan={[null, 12, 12, 6]}>
							<Heading as="h4" size="md">
								{t("settings.sending.how_it_works.title")}
							</Heading>
							<Text>
								{t("settings.sending.how_it_works.description1")}
							</Text>
							<Text>
								{t("settings.sending.how_it_works.description2")}
							</Text>
							<Text>
								{t("settings.sending.how_it_works.description3")}
							</Text>
						</GridItem>
					</Grid>
				</Box>
			)}
		</SettingsForm>
	);
};

export default Sending;