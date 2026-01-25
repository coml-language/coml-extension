use cargo_metadata::MetadataCommand;
use std::path::PathBuf;
use std::process::Command;

fn main() {
    let metadata = MetadataCommand::new()
        .no_deps()
        .exec()
        .expect("Could not fetch cargo metadata");

    let vscode_relative_path = metadata.workspace_metadata["coml"]["vscode"]
        .as_str()
        .expect("Missing workspace.metadata.coml.vscode in Cargo.toml");

    let workspace_root = metadata.workspace_root.into_std_path_buf();
    let vscode_directory = workspace_root.join(vscode_relative_path);

    println!(
        "cargo:rerun-if-changed={}",
        vscode_directory.join("package.json").display()
    );
    println!(
        "cargo:rerun-if-changed={}",
        vscode_directory.join("src").display()
    );

    println!(
        "cargo:rerun-if-changed={}",
        workspace_root
            .join("editors")
            .join("vscode")
            .join("syntaxes")
            .display()
    );

}
