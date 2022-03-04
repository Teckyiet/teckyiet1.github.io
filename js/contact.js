const accountExpandButton = document.querySelector('.expand-button')
const accountRelatedListBox = document.querySelector('.account-relates-wrapper ul')
const expandListCancelButton = document.querySelector('.expand-button ul li:last-child a')

accountExpandButton.addEventListener('mouseover', ()=>{
    accountRelatedListBox.style.setProperty('max-height', '200px')
})

accountExpandButton.addEventListener('mouseout', ()=>{
    accountRelatedListBox.style.setProperty('max-height', '0px')
})

expandListCancelButton.addEventListener('click', ()=>{
    accountRelatedListBox.style.setProperty('max-height', '0px')
})

var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([101.651249, 3.204337]),
      zoom: 12
    })
  });

  var layer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([101.651249, 3.204337]))
            })
        ]
    })
});

map.addLayer(layer)
