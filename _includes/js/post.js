var BACKEND = $('#backend').val()
var JOB_ID = $('#page_url').val()

var startkey = escape(JSON.stringify([JOB_ID])),
    endkey = escape(JSON.stringify([JOB_ID, {}]))

$.getJSON('https://krakow2016.cloudant.com/jobs/_design/applications/_view/all?startkey='+startkey+'&endkey='+endkey+'&include_docs=true&callback=?', function(applications) {

    console.log('Zgłoszeń: ', applications.rows.length)
    console.log('Wszystkich miejsc: ', $('#team_count').val())

    var available = $('#team_count').val() - applications.rows.length
    $('#available_count').text(available)
    console.log('Wolnych miejsc: ', available)

    // Displaying submitted application
    var List = Backbone.View.extend({
        el: '#list',
        initialize: function() {
            this.render()
        },
        render: function() {
            var that = this
            this.collection.forEach(function(row) {
                that.addOne(row)
            })
        },
        addOne: function(row) {
            var avatar = new Avatar({model: row}).render().el
            this.$el.append(avatar)
        }
    })

    var collection = new Backbone.Collection(applications.rows)
    new List({ collection: collection})

    $.ajax({ // Ask server whether we are authenticated
        type: "GET",
        url: BACKEND+"/me",
        cache: false,
        crossDomain: true,
        xhrFields: { withCredentials: true  }, // sends our cookie
        success: function(user) {
            if(user.ok) { // We are logged in

                var button,
                    checksum = md5([user.result._id, JOB_ID])

                var application = collection.find(function(x){ return x.id === checksum })
                if(application) { // We already have applied
                    console.log('Already applied!')
                    application.trigger('me')
                } else {
                    if(available > 0) { // Show "apply for a job" button
                        if(!user.result.verified) { // Not verified
                            $('#not-verified-alert').removeClass('hidden')
                        } else {
                            console.log('Apply!')
                            var button = new Status.Apply({model: new Backbone.Model({doc: {
                                username: user.result.profile.displayName,
                                user_id: user.result._id
                            }})})
                            $('#list').append(button.render().el)
                            $('#apply-alert').removeClass('hidden')
                        }
                    } else { // There is no more applications to apply for
                        console.log('Application closed')
                        $('#closed-alert').removeClass('hidden')
                    }
                }
            } else if(available > 0) { // Show login button
                console.log('Log in')
                $('.login-alert').removeClass('hidden')
            } else { // There is no more applications to apply for
                console.log('Application closed')
                $('#closed-alert').removeClass('hidden')
            }
        },
        error: function() {
            $('.error-alert').removeClass('hidden')
        }
    })
})

var Avatar = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
        var doc = this.model.get('doc')
        this.user_id = doc.user_id
        this.username = doc.username

        this.listenTo(this.model, 'me', function() {
            this.$('.flipper').append('<div class="back"><span class="glyphicon glyphicon-remove-circle"></span></div>')
            this.$el.addClass('activeMe')
        })
    },
    render: function() {
        var match = this.user_id.match(':(.+)$')
          , fb_id = match ? match[1] : this.user_id
        var src = 'http://graph.facebook.com/'+ fb_id +'/picture?width=100&height=100'
        if(!this.user_id) debugger

        this.$el.html( $('<div class="flipper" data-toggle="tooltip" title="'+ this.title() +'"><div class="front"><img src="'+ src +'" class="user_avatar"></div></div>') )
        this.$('.flipper').tooltip({ placement: 'bottom', container: 'body' })
        return this
    },
    title: function() {
        return this.username
    },
    events: {
        "click": "click"
    },
    click: function() {
        if(this.$el.hasClass('activeMe')) {

            this.$el.addClass('loading')
            this.$('.glyphicon').removeClass('glyphicon-remove-circle').addClass('glyphicon-refresh')

            var that = this
              , application_id = md5([this.user_id, JOB_ID])

            $.ajax({
                type: "DELETE",
                url: BACKEND+"/jobs/"+application_id,
                cache: false,
                crossDomain: true,
                contentType: "application/json",
                dataType: 'json',
                xhrFields: { withCredentials: true },
                success: function(data) {
                    if(data.error) return
                    var opts = { model: new Backbone.Model({doc: {
                        username: that.username,
                        user_id: that.user_id
                    }})}
                    that.$el.replaceWith(new Status.Apply(opts).render().el)

                    var available = parseInt($('#available_count').text())
                    $('#available_count').text(available+1)
                    $('#apply-alert').removeClass('hidden')
                    $('#applied-alert').addClass('hidden')
                }
            })
        }
    }
})

var Status = {
    Apply: Avatar.extend({
        className: 'me',
        render: function() {
            Avatar.prototype.render.call(this)
            this.$('.flipper').append('<div class="back"><span class="glyphicon glyphicon-ok-circle"></span></div>')
            return this
        },
        title: function() {
            return "Kliknij żeby się zgłosić do zadania!"
        },
        events: {
            "click": "click"
        },
        click: function() {

            this.$el.addClass('loading')
            this.$('.glyphicon').removeClass('glyphicon-ok-circle').addClass('glyphicon-refresh')

            var $el = this.$el,
                that = this

            $.ajax({
                type: "POST",
                url: BACKEND+"/jobs",
                cache: false,
                crossDomain: true,
                contentType: "application/json",
                data: JSON.stringify({ url: JOB_ID, username: this.model.get('doc').username }),
                dataType: 'json',
                xhrFields: { withCredentials: true },
                success: function(data) {
                    if(data.error) return
                    $el.replaceWith(new Avatar({model: that.model}).render().el)
                    that.model.trigger('me')

                    var available = parseInt($('#available_count').text())
                    $('#available_count').text(available-1)
                    $('#apply-alert').addClass('hidden')
                    $('#applied-alert').removeClass('hidden')
                }
            })
        }
    })
}

$('.apply-btn').click(function() {
    $('.me').click()
})

// Facebook comments
var fb = function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/pl_PL/sdk.js#xfbml=1&appId=1448147642126607&version=v2.0";
    fjs.parentNode.insertBefore(js, fjs) }
fb(document, 'script', 'facebook-jssdk')

window.document.cookie = "callback="+window.location.toString()+";path=/"
