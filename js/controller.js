var all_colors = ['w', 'u', 'b', 'r', 'g'];

var color_to_rgb = {
    'w': '#fff9bc',
    'u': '#0066CC',
    'b': '#404040',
    'r': '#E13C1E',
    'g': '#159100',
}

var copy_array = function(arr) {
    return arr.slice(0, arr.length);
}

class Player {
    constructor(name, life, colors) {
        this.name = name;
        this.life = life;
        this.colors = colors;
        this.style = {};
        this.commander_damage = {};
        this.poison = 0;
        this.is_monarch = false;
        this.is_ascended = false;
        this.energy = 0;
        this.misc_counters = [];
    }

    reset_colors() {
        this.colors = copy_array(all_colors);
    }

    add_color(color) {
        this.colors.push(color);
        // console.log([this.colors, this.colors.length, this.style['background']].join(' '));
        var inner = this.colors.map(c => color_to_rgb[c]).join(', ');
        if (this.colors.length > 2) {
            inner = color_to_rgb[this.colors[0]] + ', ' + inner + ', ' + color_to_rgb[this.colors[this.colors.length - 1]];
        } else if (this.colors.length == 2) {

        } else {
            inner = inner + ', ' + inner;
        }
        this.style['background'] = 'linear-gradient( 135deg, ' + inner + ')';
    }

    reset_colors() {
        this.colors = [];
        this.style['background'] = ''
    }

    add_counter() {
        this.misc_counters.push(0);
    }

    remove_counter() {
        this.misc_counters.pop();
    }
    
    static unJSON(json_obj) {
        var p = new Player();
        // debug the deserialized player attributes
        // console.log("loading JSON into self:");
        // console.log("player data: " + json_obj);
        for (var v in json_obj) {
            // debug individual attribute values
            // console.log("Setting this.[" + v + "] to " + json_obj[v]);
            p[v] = json_obj[v];
        }
        return p;
    }
};

app.controller("myCtrl", ["$scope", function($scope) {
    $scope.message = "Hello"
    $scope.players = Array();
    $scope.starting_life = 20;
    $scope.is_editing = false;
    $scope.all_colors = all_colors;
    $scope.show_commander_damage = false;


    var default_player = function() {
        return new Player("Player " + ($scope.players.length + 1), 20, []);
    }

    var add_player = function() {
        $scope.players.push(default_player());
        console.log($scope.players);
    }
    var get_num_players = function() {
        return $scope.players.length;
    };
    var set_all_life_totals = function(n) {
        for (let i = 0; i < $scope.players.length; i++) {
            $scope.players[i].life = n;
        }

    };

    var set_monarch = function(index) {
        if (!$scope.players[index].is_monarch) {
            for (let i = 0; i < $scope.players.length; i++) {
                $scope.players[i].is_monarch = false;
            }
            $scope.players[index].is_monarch = true;
        } else {
            console.log("De-monarch " + index)
            $scope.players[index].is_monarch = false;
        }
    }

    var add_color = function(player, color) {
        player.colors.push(color);
    }
    var pop_player = function(){
        $scope.players.pop();

    }


    $scope.utils = {
        default_player: default_player,
        add_player: add_player,
        get_num_players: get_num_players,
        set_all_life_totals: set_all_life_totals,
        add_color: add_color,
        copy_array: copy_array,
        set_monarch: set_monarch,
        pop_player: pop_player,
    }

}]);