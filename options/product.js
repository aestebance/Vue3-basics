app.component("product", {
    template: `
          <section class="product">
            <div class="product__thumbnails">
                <div
                        v-for="(image, index) in product.images"
                        :key="index"
                        class="thumb" :class="{active: activeImage === index}"
                        :style="{backgroundImage: 'url(' + product.images[index].thumbnail + ')'}"
                        @click="activeImage = index"
                ></div>
            </div>
            <div class="product__image">
                <img :src="product.images[activeImage].image" alt="product.name">
            </div>
        </section>
        <section class="description">
            <h4>{{product.name.toUpperCase()}} {{product.stock === 0 ? "😓" : "😀"}}</h4>
            <badge :product="product"></badge>
            <p class="description__status" v-if="product.stock === 3">Quedan pocas unidades!</p>
            <p class="description__status" v-else-if="product.stock === 2">El producto está por terminarse!</p>
            <p class="description__status" v-else-if="product.stock === 1">La última unidad disponible</p>
            <p class="description__price" :style="{color: price_color}">{{new Intl.NumberFormat("es-ES").format(product.price)}} €</p>
            <p class="description__content">
                {{product.content}}
            </p>
            <div class="discount">
                <span>Código de descuento</span>
                <input type="text" placeholder="Ingresa tu código" @keyup.enter="applyDiscounts($event)">
            </div>
            <button :disabled="product.stock === 0" @click="sendToCart()">Agregar al carrito</button>
        </section>
    `,
    props: ["product"],
    emits: ["sendtocart"],
    data() {
        return {
            activeImage: 0,
            discountCodes: ["PLATZI20", "ALEJANDRO"],
            // price_color: "rgb(104, 104, 209)"
        };
    },
    methods: {
        applyDiscounts(event) {
            const discountCodeIndex = this.discountCodes.indexOf(event.target.value);
            if (discountCodeIndex >= 0) {
                this.product.price *= 50/100;
                this.discountCodes.splice(discountCodeIndex, 1);
            }
        },
        sendToCart() {
            this.$emit("sendtocart", this.product);
        }
    },
    watch: {
        activeImage(value, oldValue) {
            console.log(value, oldValue);
        },
        // "product.stock"(stock) {
        //     if (stock <= 1) {
        //         this.price_color = "rgb(188 30 67)"
        //     }
        // }
    },
    computed: {
        price_color() {
            if (this.product.stock <= 1) {
                return "rgb(188, 30, 67)";
            }
            return "rgb(104, 104, 209)";
        }
    }
});
