var breedImage = $("#breed-image");
var dropdown = $("#dog-breeds");

/* This code is making an AJAX GET request to the URL to retrieve a list of dog breeds.*/
$.get("https://dog.ceo/api/breeds/list/all", function (data, status) {
    let dogBreeds = data.message;
    for (let breed in dogBreeds) {
        dropdown.append('<option value="' + breed + '">' + breed + "</option>");
    }
});

/* The `dropdown.change()` function is an event handler that is triggered when the value of the dropdown select element changes. */
dropdown.change(function () {
    let breed = dropdown.val();
    let url = "https://dog.ceo/api/breed/" + breed + "/list";

    $("#dog-sub-breeds").remove();

    $.get(url, function (data) {
        if (data.message.length !== 0) {
            let subBreeds = data.message;

            dropdown.after('<select id="dog-sub-breeds"></select>');

            var subDropdown = $("#dog-sub-breeds");

            /* The code block is iterating over each subBreed in the subBreeds array and dynamically creating an
            option element for each subBreed in the subDropdown select element.*/
            for (let subBreed of subBreeds) {
                subDropdown.append(
                    '<option value="' + subBreed + '">' + subBreed + "</option>"
                );
                console.log(subBreed);
            }
        }
    });
    console.log(url);
});

/* This code is attaching a click event handler to the button element inside a form. When the button is
clicked, the event handler function is executed. */
$("form button").click(function (e) {
    e.preventDefault();

    let breed = dropdown.val();
    let subBreed = $("#dog-sub-breeds").val();

    let url = "https://dog.ceo/api/breed/" + breed;
    if (subBreed !== undefined) {
        url += "/" + subBreed;
    }
    url += "/images";

    $("#breed-image img").remove();

    $.get(url, function (data) {
        let imagesUrl = data.message;

        for (let imageUrl of imagesUrl) {
            breedImage.append(
                '<img src="' + imageUrl + '" alt="' + breed + '">'
            );
        }
    });
});
