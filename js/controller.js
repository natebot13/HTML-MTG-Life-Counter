var all_colors = ['w', 'u', 'b', 'r', 'g'];

var color_to_rgb = {
    'w': '#DCe0BB',
    'u': '#0066CC',
    'b': '#232323',
    'r': '#E13C1E',
    'g': '#336600',
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
        this.show_commander_damage = {};
    }

    reset_colors() {
        this.colors = copy_array(all_colors);
    }

    add_color(color) {
        this.colors.push(color);
        // console.log([this.colors, this.colors.length, this.style['background']].join(' '));
        var inner = this.colors.map(c => color_to_rgb[c]).join(', ');
        if (this.colors.length > 1) {
            inner = color_to_rgb[this.colors[0]] + ', ' + inner + ', ' + color_to_rgb[this.colors[this.colors.length - 1]];
        } else {
            inner = inner + ', ' + inner;
        }
        this.style['background'] = 'linear-gradient( 135deg, ' + inner + ')';
    }

    reset_colors() {
        this.colors = [];
        this.style['background'] = ''
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
        return new Player("Default Player " + ($scope.players.length + 1), 20, []);
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

    var add_color = function(player, color) {
        player.colors.push(color);
    }


    $scope.utils = {
        default_player: default_player,
        add_player: add_player,
        get_num_players: get_num_players,
        set_all_life_totals: set_all_life_totals,
        add_color: add_color,
        copy_array: copy_array,
    }

}]);