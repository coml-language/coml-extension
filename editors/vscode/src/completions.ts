import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const provider = vscode.languages.registerCompletionItemProvider(
        "coml",
        {
            provideCompletionItems(
                document: vscode.TextDocument,
                position: vscode.Position
            ) {
                const linePrefix = document.lineAt(position).text.substr(0, position.character);
                const completions: vscode.CompletionItem[] = [];

                // 1. Détection des Headers : si on tape '{['
                if (linePrefix.endsWith('{[') || linePrefix.trim() === '{') {
                    const sections = ['package', 'dependencies', 'metadata', 'scripts'];

                    sections.forEach(section => {
                        const item = new vscode.CompletionItem(section, vscode.CompletionItemKind.Module);
                        // On insère le nom et on ferme les crochets/accolades automatiquement
                        item.insertText = new vscode.SnippetString(`${section}]}`);
                        item.documentation = new vscode.MarkdownString(`Ajouter la section \`{[${section}]}\``);
                        completions.push(item);
                    });
                }

                // 2. Suggestions de propriétés communes après le header [package]
                // (Optionnel : on peut scanner le document pour voir dans quelle section on est)
                const packageKeys = ['name', 'version', 'authors', 'license', 'description'];
                if (!linePrefix.includes('=') && !linePrefix.startsWith('{')) {
                    packageKeys.forEach(key => {
                        const item = new vscode.CompletionItem(key, vscode.CompletionItemKind.Property);
                        item.insertText = new vscode.SnippetString(`${key} = "\${1}"`);
                        completions.push(item);
                    });
                }

                // 3. Suggestion pour le mot-clé workspace
                if (linePrefix.includes('=')) {
                    const workspaceItem = new vscode.CompletionItem('workspace', vscode.CompletionItemKind.Keyword);
                    workspaceItem.insertText = new vscode.SnippetString('workspace = true');
                    completions.push(workspaceItem);
                }

                return completions;
            }
        },
        '{', '[', ' ' // Caractères qui déclenchent l'apparition de la liste
    );

    context.subscriptions.push(provider);
}