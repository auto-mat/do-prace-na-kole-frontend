<template>
    <b-table small :fields="fields" :items="users" responsive="sm" class="overflow-auto">

    </b-table>
</template>

<script>
import round from 'vue-round-filter';

export default {
    computed: {
        fields() {
            var fields = ["subsidiary", "team", "user"];
            for (var dayi in this.days) {
                fields.push(this.days[dayi]);
            }
            return fields;
        },
        users() {
            var users = {};
            for (var tripi in this.trips) {
                var trip = this.trips[tripi];
                if(!(trip.user_attendance in users)) {
                    users[trip.user_attendance] = {};
                    for (var dayi in this.days) {
                        var day = this.days[dayi];
                        users[trip.user_attendance][day] = "";
                    }
                    users[trip.user_attendance]["subsidiary"] = trip.subsidiary
                    users[trip.user_attendance]["team"] = trip.team
                    users[trip.user_attendance]["user"] = trip.user
                }
                users[trip.user_attendance][trip.trip_date] = trip;
            }
            var user_array = [];
            for (var userk in users) {
                var user = users[userk];
                user_array.push(user);
            }
            return user_array;
        }
    },
    props: ["trips", "days", "commute_modes"],
    filters: {round,},
}
</script>

<style>
</style>
