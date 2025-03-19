{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  buildInputs = [
    pkgs.openjdk17
    pkgs.nodejs-18_x
    pkgs.yarn
    pkgs.sudo
  ];
  shellHook = ''
    export JAVA_HOME=${pkgs.openjdk17}/lib/openjdk
    echo "Using Node $(node --version), Yarn $(yarn --version), Java 17 at $JAVA_HOME, and sudo."

    # Silence the "__vsc_prompt_cmd_original" error:
    if ! command -v __vsc_prompt_cmd_original >/dev/null 2>&1; then
      __vsc_prompt_cmd_original() { :; }
    fi
  '';
}