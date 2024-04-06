<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
    
    data.test = {
        a: 'asdf',
        b: 'zxcb'
    }


    interface Thing {
        msg: string
    };

    let dirty = false;
    let thing: Thing = {
        msg: ''
    }

    $: {
        if(dirty){
            localStorage.setItem('thing', JSON.stringify(thing));
        }
    }
    
    function load(){
        let f = localStorage.getItem('thing');
        if(f){
            thing = JSON.parse(f) as unknown as Thing;
            dirty = false;
        }
    }
</script>


<p>{thing.msg}</p>

<input type="text" bind:value={thing.msg} on:change={()=>dirty=true}>

<button on:click={load}>test</button>