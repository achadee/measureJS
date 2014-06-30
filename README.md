measureJS
=========

## About
A node JS measurement utility to convert, manipulate and format units.

## Install
```erlang
TODO
```

## Setup
```erlang
var measure = require('measure');
var weight = measure('4kg');
weight.config(path/to/measurement/weights.json);
```
## Examples

# Converting units

Converting units to other types uses the `to` method

```erlang
weight.config(path/to/measurement/weights.json);
...
var weight = measure('4kg');

// --> all these do the same thing!
weight.to('pounds');
weight.to('p');

// --> you can also chain convertions
weight.to('pounds').to('kg').to('tons'); //.....
```

## Versioning

This project will adhere to the principles of
[semantic versioning](http://semver.org) once a first public API is declared.

## Roadmap

See the `TODO.md` file for upcoming plans/changes.
