{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, flake-utils, nixpkgs }:

  flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs { inherit system; };
    in {
      # For `nix develop`:
      devShell = pkgs.mkShell {
        nativeBuildInputs = [
          pkgs.nodejs_21
          pkgs.nodePackages.pnpm
        ];
      };
    }
  );
}