import Handlebars from 'handlebars';
import Block from './Block';

import Button from '../components/button';
import WindowManager from '../components/windowManager';
import StatusBar from '../components/statusBar';
import ChatListItem from '../components/chatListItem';
import InputValidate from '../components/inputValidate';
import FormField from '../components/formField';

function registerComponent(name: string, Component: typeof Block): void {
	Handlebars.registerHelper(name, ({
																		 data,
																		 hash
																	 }) => {
		// @ts-ignore
		const component: any = new Component(hash);
		if (!data.root.children) {
			data.root.children = {};
		}

		data.root.children[component._id] = component;
		return `<div data-id='${component._id}'></div>`;
	});
}

export const COMPONENTS = {
	windowManager: WindowManager,
	button: Button,
	statusBar: StatusBar,
	chatListItem: ChatListItem,
	inputValidate: InputValidate,
	formField: FormField
};

export default function registrationAllComponents(): void {
	Object.entries(COMPONENTS)
		.map(([key, value]: [string, any]) => registerComponent(key, value));
}
