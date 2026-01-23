import { workspace, ExtensionContext, window } from 'vscode';

import { Executable, LanguageClient, LanguageClientOptions, ServerOptions } from "vscode-languageclient/node";


let client: LanguageClient;

export async function activate(_context: ExtensionContext) {
    console.log("COML EXTENSION")
    const command = process.env.SERVER_PATH || "coml-server";
    const run: Executable = {
        command,
        options: {
            env: {
                ...process.env,
                RUST_LOG: "debug"
            }
        }
    }
    const serverOptions: ServerOptions = {
        run,
        debug: run,
    }

    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'coml' }]
    }


    client = new LanguageClient(
        "coml-lsp",
        "COML Language Server",
        serverOptions,
        clientOptions,
    );

    client.start();
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}