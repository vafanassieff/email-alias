# email-alias

<p align="center">
  <a href="https://github.com/vafanassieff/email-alias/releases" alt="Build">
    <img src="https://img.shields.io/github/workflow/status/vafanassieff/email-alias/build" />
  </a>
  <a href="https://github.com/vafanassieff/email-alias/releases" alt="Release">
    <img src="https://img.shields.io/github/v/release/vafanassieff/email-alias" />
  </a>
  <a href="https://twitter.com/afalol">
    <img src="https://img.shields.io/twitter/follow/afalol?style=social"
        alt="Follow me on Twitter">
  </a>
</p>

Create a email alias easly from CLI !

## Install

To install this package use the command below :

`npm install -g @vafanassieff/email-alias`

### Update

To update the package run `npm update -g @vafanassieff/email-alias`

## Usage

```Shell
Usage: email-alias [options] [command]

Manage email alias

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  list            List current alias
  add [options]   Add a new alias
  remove <alias>  Add a new alias
  provider
  help [command]  display help for command
```

## Providers

At the moment there is only OVH as an email alias provider
