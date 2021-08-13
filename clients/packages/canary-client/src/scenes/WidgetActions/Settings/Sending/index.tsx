import React, {useState} from "react";
import { Card, Header, Text, Button, SwitchField } from "bonde-components";
import { Modal } from "bonde-components";
import { useTranslation } from "react-i18next";
import { Widget } from "../../FetchWidgets";
import SettingsForm from '../SettingsForm';
import SelectField from "../../../../components/SelectField";
import styled from "styled-components";
import { OptimizedPressure } from "../../../Community/Domains/Icons";
import { Flex } from "./Flex";
import SpyField from "../../../../components/SpyField";

type Props = {
	widget: Widget;
};

const SpyStyled = styled.div`
	display: grid;
	grid-template-columns: 55% 45%;
	grid-column-gap: 20px;
	height: 100%;
`;

const Sending = ({ widget }: Props): React.ReactElement => {
	const { t } = useTranslation("widgetActions");
	const [isOpen, setIsOpen] = useState(false);

	return (
		<SettingsForm
			widget={widget}
			initialValues={{
				settings: {
					optimization_enabled: true,
					...widget.settings
				}
			}}
		>
			{({form}: any) => (
				<Card padding={{ x: 40, y: 30 }}>
					<SpyStyled>
						<Flex spacing="32px">
							<OptimizedPressure />

							<div>
								<Header.H4>
									{t("settings.sending.title")}
								</Header.H4>
								<Text style={{ marginBottom: "15px" }}>
									{t("settings.sending.subtitle")}
								</Text>

								<SwitchField name="settings.optimization_enabled" textOn="ATIVADO" textOff="DESATIVADO" />
								<SpyField field="settings.optimization_enabled">
									{({ value }: any) => !value && (
										<Modal width={400} isOpen={isOpen} onClose={()=> {
											form.change("settings.optimization_enabled", true)
											setIsOpen(false)
										}}>
											<h1>Salve!!!</h1>
										</Modal>
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

								<Button type="submit">Salvar Alterações</Button>
							</div>
						</Flex>

						<div>
							<Header.H4
								style={{
									margin: "10px 0",
								}}
							>
								{t("settings.sending.how_it_works.title")}
							</Header.H4>
							<Text
								style={{ marginBottom: "15px" }}
								dangerouslySetInnerHTML={{ __html: t("settings.sending.how_it_works.description") }}
							/>
						</div>
					</SpyStyled>
				</Card>
			)}
		</SettingsForm>
	);
};

export default Sending;