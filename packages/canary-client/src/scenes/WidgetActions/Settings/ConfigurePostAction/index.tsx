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

	const mergetags = [
		{ value: 'First.Name', title: '' },
		{ value: 'Email', title: 'Email' },
	]

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
					finish_message_html_text: widget.settings?.finish_message_html_text || ''
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
												<HTMLField name='settings.finish_message_html_text' initialValue={widget.settings.finish_message_html_text} mergetags={mergetags} />
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
