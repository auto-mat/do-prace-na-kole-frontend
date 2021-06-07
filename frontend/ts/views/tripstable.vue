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
                var date = new Date(this.days[dayi]);
                console.log(this.days[dayi]);
                console.log(date);
                fields.push({
                    key: this.days[dayi],
                    label: " " + date.getDate() + "." + (date.getMonth() + 1)
                });
            }
            return fields;
        },
        users() {
            var users = {};
            for (var tripi in this.trips) {
                var trip = this.trips[tripi];
                var date = new Date(trip.trip_date);
                trip.trip_date = ""+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate())
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
                users[trip.user_attendance][trip.trip_date] = trip.commuteMode;
            }
            var user_array = [];
            for (var userk in users) {
                var user = users[userk];
                user_array.push(user);
            }
            console.log(user_array)
            return user_array;
        }
    },
    props: ["trips", "days", "commute_modes"],
    filters: {round,},
}
</script>

<style>
</style>
