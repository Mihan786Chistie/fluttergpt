// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { OpenAIRepository } from './repository/openai-repository';
import {createWidgetFromDescription} from './tools/create/widget_from_description';
import {refactorCode} from './tools/refactor/refactor_from_instructions';
import {createModelClass} from './tools/create/class_model_from_json';
import {fixErrors} from './tools/refactor/fix_errors';
import { createCodeFromBlueprint } from './tools/create/code_from_blueprint';
import { createRepoClassFromPostman } from './tools/create/class_repository_from_json';
import { open } from 'fs';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "fluttergpt" is now active!');
    const config = vscode.workspace.getConfiguration('fluttergpt');
    const apiKey = config.get<string>('apiKey');

    const openAIRepo = new OpenAIRepository(apiKey);

    let createWidgetDisposable = vscode.commands.registerCommand('fluttergpt.createWidget', async () => createWidgetFromDescription(openAIRepo));
	context.subscriptions.push(createWidgetDisposable);

    let createCodeDisposable = vscode.commands.registerCommand('fluttergpt.createCodeFromBlueprint', () => createCodeFromBlueprint(openAIRepo));
    context.subscriptions.push(createCodeDisposable);

    let createModelClassDisposable = vscode.commands.registerCommand("fluttergpt.createModelClass", async () => createModelClass(openAIRepo));
    context.subscriptions.push(createModelClassDisposable);
    
    let refactorDisposable = vscode.commands.registerCommand('fluttergpt.refactorCode',()=> refactorCode(openAIRepo));
    context.subscriptions.push(refactorDisposable);

    let fixErrorsDisposable = vscode.commands.registerCommand('fluttergpt.fixErrors', async () => fixErrors(openAIRepo));
    context.subscriptions.push(fixErrorsDisposable);

    let createRepoClassFromPostmanDisposable = vscode.commands.registerCommand('fluttergpt.createRepoClassFromPostman', () => createRepoClassFromPostman(openAIRepo));
    context.subscriptions.push(createRepoClassFromPostmanDisposable);
}


// This method is called when your extension is deactivated
export function deactivate() {}
