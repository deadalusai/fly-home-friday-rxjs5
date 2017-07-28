# Demo 1

## Add imports

    // These are done once per project
    import 'rxjs/add/observable/fromEvent';
    import 'rxjs/add/operator/switchMap';

    import { Observable } from 'rxjs/Observable';


## Add basic implementation

    let input$ = Observable.fromEvent(textbox, 'keyup').map(e => textbox.value);
    let values$ = input$.switchMap(searchTerm => getDataAsync(searchTerm));

    values$.subscribe(data => {
        updateOutput(data);
    });

## Demonstrate!


## Debounce

    import 'rxjs/add/operator/debounceTime';

Add `.debounceTime(300)` to values$ definition.


# Add "initial" value to input

    import 'rxjs/add/operator/startWith';

Add `.startWith('')` to values$ definition.


# Demo 2