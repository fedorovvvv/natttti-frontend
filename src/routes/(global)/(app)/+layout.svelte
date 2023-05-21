<script lang='ts'>
	import { Header } from "$widgets/Header";


</script>

<Header/>
<slot/>

<style lang='sass' global>
    @import '../../../styles/global.sass'
    // @import '../../../styles/smui-theme.scss'
    h1
        font-weight: 700
        font-size: 50px
        line-height: 109.4%
        letter-spacing: 0.01em
        @media (max-width: $sm)
            font-size: 40px
    h2
        font-weight: 700
        font-size: 36px
        letter-spacing: -0.01em
        @media (max-width: $sm)
            font-size: 30px
    h3
        font-weight: 600
        font-size: 20px
        line-height: 120%
        letter-spacing: -0.01em
    p
        font-weight: 400
        font-size: 16px
        line-height: 150%
</style>