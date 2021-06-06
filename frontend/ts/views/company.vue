<template>
    <div
        v-if="rest.my_company"
    >
        <statscard
            v-bind:icon_url="rest.my_company.icon_url"
            v-bind:frequency="rest.my_company.frequency"
            v-bind:trips="rest.my_company.eco_trip_count"
            v-bind:trips_base="rest.my_company.working_rides_base_count"
            v-bind:km="rest.my_company.distance"
            v-bind:co2="rest.my_company.emissions.co2"
        ></statscard>
        <div class="row">
            <div class="col"></div>
            <div class="col-4">
                <button
                    class="btn btn-success btn-lg"
                    v-on:click="toggle_trips"
                >
                    <i class="fas fa-receipt"></i>
                    Tabulka jízd
                </button>
            </div>
        </div>
        <div v-if="show_colleague_trips">
            <div class="card">
                <div class="card-body">
                    <div v-if="!rest.colleague_trips__loaded">
                        Načítá se...
                    </div>
                    <div v-if="rest.colleague_trips">
                        <div v-for="trip in rest.colleague_trips">
                            <p>
                            {{trip.trip_date}}
                            </p>
                            <p>
                            {{trip.direction}}
                            </p>
                            <p>
                                {{trip.commuteMode}}
                            </p>
                            <p>
                                {{trip.distanceMeters / 1000}}
                            </p>
                            <p>
                                {{trip.user}}
                            </p>
                            <p>
                                {{trip.id}}
                            </p>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card" v-if="multiple_subsidiaries">
            <div class="card-title">
                <h3>
                Pobočky
                </h3>
            </div>
            <div class="card-body">
                <statscard
                    v-for="subsidiary in rest.my_company.subsidiaries"
                    v-bind:key="subsidiary.id"
                    v-bind:name="subsidiary.address_street"
                    v-bind:icon_url="subsidiary.icon_url"
                    v-bind:frequency="subsidiary.frequency"
                    v-bind:trips="subsidiary.eco_trip_count"
                    v-bind:trips_base="subsidiary.working_rides_base_count"
                    v-bind:km="subsidiary.dinstance"
                ></statscard>
            </div>
        </div>
    </div>
</template>

<script>
import round from 'vue-round-filter';
import statscard from './statscard.vue';

export default {
    data () { return {
        rest: {
            my_company: false,
            colleague_trips: false,
            colleague_trips__loaded: false,
        },
        show_colleague_trips: false,
    }},
    filters: {round,},
    components: {
        statscard,
    },
    mounted() {
        var vm = this;
        $.getJSON('/rest/my_company',
                  function(data) {
                      vm.$data.rest.my_company = data.results[0];
        });
    },
    computed: {
        multiple_subsidiaries () {
            return this.rest.my_company.subsidiaries.length > 1;
        }
    },
    methods: {
        load_trips(data){
            if (this.rest.colleague_trips) {
                this.rest.colleague_trips = this.rest.colleague_trips.concat(data.results);
            } else {
                this.rest.colleague_trips = data.results;
            }
            if(data.next) {
                $.getJSON(data.next, this.load_trips);
            } else {
                this.rest.colleague_trips__loaded = true;
            }
        },
        toggle_trips() {
            this.show_colleague_trips = !this.show_colleague_trips;
            $.getJSON('/rest/colleague_trips', this.load_trips);
        }
    }
}
</script>

<style>
.co2 {
    padding-top: 20px;
}
b {
    margin-left: 3px;
    margin-right: 3px;
}
</style>
