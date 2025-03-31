import React from "react";
import { TextareaField, RadioField } from 'bonde-components';
import {
	Box,
	Button,
	Flex,
	Heading,
	Grid,
	GridItem,
	Radio
} from "bonde-components/chakra";
import { useTranslation } from "react-i18next";

import { Widget } from "../../FetchWidgets";
import SpyField from "../../../../components/SpyField";
import SettingsForm from '../SettingsForm';
import DefaultPostAction from "./DefaultPostAction";
import RichInputField from "./RichInputField";
import HTMLField from "../HTMLField";
import HTMLPreview from "../HTMLPreview";


const defaultPostActionHTML = `
<div><h2 style="text-align: center;">E-mail enviado!</h2>
<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://hub-central.s3.us-east-1.amazonaws.com/assets/check-mark-image.png" alt="Icone de sucesso" width="100" height="100"></p>
<p>&nbsp;</p>
<div>
<div style="text-align: center;">Compartilhe com sua galera para aumentarmos nosso impacto!</div>
<div style="text-align: center;">&nbsp;</div>
<div style="text-align: center;">
<a class="social facebook" contenteditable="false" href="https://www.facebook.com/sharer.php?u={{SHARE_URL}}" target="_blank" rel="noopener noreferrer">Compartilhar no Facebook</a>
<a class="social twitter" contenteditable="false" href="https://twitter.com/intent/tweet?text={{SHARE_TWITTER_TEXT}}&amp;url={{SHARE_URL}}" target="_blank" rel="noopener noreferrer">Compartilhar no Twitter</a>
<a class="social whatsapp" contenteditable="false" href="https://web.whatsapp.com/send?text={{SHARE_URL}}" target="_blank" rel="noopener noreferrer">Compartilhar no Whatsapp</a>
<br>
</div>
</div></div>
`;

type Props = {
	widget: Widget;
	updateCache: any;
};

const ConfigurePostAction = ({ widget, updateCache }: Props): React.ReactElement => {
	const { t } = useTranslation("widgetActions");
	const {
		finish_message: finishMessage,
		finish_message_type: finishMessageType
	} = widget.settings || {}

	// Parse older finish messages saved like text
	const newFinishMessage = !!finishMessage && typeof finishMessage === 'string'
		? JSON.parse(finishMessage)
		: finishMessage
		;
	const newFinishMessageType = finishMessageType || 'share';

	// Verifica se o registro já usa o "custom"
	const hasCustomOption = !!finishMessage;

	const mergetags_list: any = []

	if (widget.kind === "pressure") {
		mergetags_list.push({ value: "name", text: "Nome" });
		mergetags_list.push({ value: "lastname", text: "Sobrenome" });
		mergetags_list.push({ value: "email", text: "Email" });
		if (widget.settings.show_city === "s" || widget.settings.show_city === "city-true") {
			mergetags_list.push({ value: "city", text: "Cidade" });
		}
		if (widget.settings.show_state === "s") {
			mergetags_list.push({ value: "state", text: "Estado" });
		}
	} else if (widget.kind === "busao0800") {
		mergetags_list.push({ value: "full_name", text: "Nome" });
		mergetags_list.push({ value: "email", text: "Email" });
		mergetags_list.push({ value: "n_employees", text: "Número de colaboradores" });
		mergetags_list.push({ value: "transportation_cost", text: "Valor total gasto com Vale Transporte" });
		mergetags_list.push({ value: "totalCost", text: "Valor total gasto" });
		mergetags_list.push({ value: "saveMoney", text: "Valor Economizado" });
	}

	return (
		<SettingsForm
			widget={widget}
			afterSubmit={async (values: any, result: any) => {
				updateCache(result.data.update_widgets.returning[0])
			}}
			initialValues={{
				settings: {
					...widget.settings,
					finish_message: newFinishMessage,
					finish_message_type: newFinishMessageType,
					finish_message_html_text: widget.settings?.finish_message_html_text || ""
				}
			}}
		>
			{({ submitting, dirty }: any) => (
				<Box bg="white" boxShadow="sm" p={6}>
					<Grid templateColumns="repeat(12, 1fr)" gap={16}>
						<SpyField field='settings.finish_message_type'>
							{({ value }) => (
								<>
									<GridItem colSpan={[12, 12, 6]}>
										<div style={{ display: "flex", flexDirection: "column" }}>
											<div style={{ marginBottom: "25px" }}>
												<Heading as="h3" size="xl">Pós-ação</Heading>
											</div>
											<RadioField
												name='settings.finish_message_type'
												label={t("settings.finish.title")}
											>
												<Radio value='share'>
													{t("settings.finish.radio.share")}
												</Radio>
												{/* Mostra a opção "custom" apenas se já existir */}
												{hasCustomOption && (
													<Radio value='custom'>
														{t("settings.finish.radio.custom")}
													</Radio>
												)}
												<Radio value='html'>
													{t("settings.finish.radio.html")}
												</Radio>
											</RadioField>
											{value === 'share' ? (
												<TextareaField
													label={t("settings.finish.default.whatsapp.label")}
													name="settings.whatsapp_text"
													placeholder={t("settings.finish.default.whatsapp.placeholder")}
												/>
											) : value === 'custom' ? (
												<RichInputField name='settings.finish_message' />
											) : (
												<HTMLField
													name='settings.finish_message_html_text'
													initialValue={widget.settings.finish_message_html_text}
													init={{
														mergetags_list: mergetags_list,
														social_share_url: widget.block.mobilization.custom_domain,
														social_twitter_text: widget.block.mobilization.twitter_share_text,
														templates_list: [
															{
																"title": "Mensagem padrão",
																"content": defaultPostActionHTML
																	.replace(/\{\{SHARE_URL\}\}/g, widget.block.mobilization.custom_domain || "")
																	.replace(/\{\{SHARE_TWITTER_TEXT\}\}/, widget.block.mobilization.twitter_share_text || "")
															}
														]
													}}
												/>
											)}
											<Flex justify='end'>
												<Button disabled={submitting || !dirty} type='submit'>{t('settings.defaultForm.submit')}</Button>
											</Flex>
										</div>
									</GridItem>
									<GridItem colSpan={[12, 12, 6]}>
										{value === 'share' && <DefaultPostAction />}
										{value === 'html' && <HTMLPreview name="settings.finish_message_html_text" />}
									</GridItem>
								</>
							)}
						</SpyField>
					</Grid>
				</Box>
			)}
		</SettingsForm>
	);
};

export default ConfigurePostAction;
